import { BadRequestError, NotFoundError } from "../exception/error.js"
import { CheckPassword, GeneratePassword } from "../utils/bcrypt.js"
import { LoginSchema, OTPSchema, RegisterSchema, UserFindByEmaildSchema } from "../validator/UserSchema.js"
import { sign } from '../utils/jwt.js';
import { resClearCookie } from "../utils/response.js";
import { SendEmailResetPassword } from '../utils/email.js';
import generateOTP from "../utils/otp.js";

const AuthService = (AuthRepository, UserRepository, db, validator) => ({
    async Auth(user) {
        return user.token
    },
    async Login(user) {
        const isValid = validator.validate(user, LoginSchema)
        validator.check(isValid)
        const result = await AuthRepository.FindByEmail(user.email)
        if (!result) throw NotFoundError('email tidak ditemukan atau belum terdaftar')
        await CheckPassword(user.password, result.password)
        const token = await sign({ id: result.id, username: result.username })
        return token
    },
    async Register(user) {
        const client = await db.Pool.connect()
        const tx = db.transaction(client)
        const isValid = validator.validate(user, RegisterSchema)
        validator.check(isValid)
        const isExist = await AuthRepository.FindByEmail(user.email)
        if (isExist == user.email) throw BadRequestError('email sudah digunakan')
        try {
            await tx.BEGIN()
            user.password = await GeneratePassword(user.password)
            const resultUser = await AuthRepository.Create(user)
            await UserRepository.Create(resultUser.id)
            await tx.COMMIT()
            return resultUser
        } catch (error) {
            await tx.ROLLBACK()
            throw error
        } finally {
            client.release()
        }
    },
    Logout(req, res) {
        resClearCookie(res, req.token)
        return 'logout success'
    },
    async SendOTP(user) {
        const isValid = validator.validate(user, UserFindByEmaildSchema)
        validator.check(isValid)

        const FindByEmail = await AuthRepository.FindByEmail(user.email)
        if (!FindByEmail) throw NotFoundError()

        user.user_id = FindByEmail.id
        user.otp_code = generateOTP()

        const FindOTP = await AuthRepository.FindOTP(FindByEmail.id)
        if (FindOTP) {
            await AuthRepository.DeleteOTP(FindOTP.id)
        }

        const resultCreateOTP = await AuthRepository.CreateOTP(user)

        await SendEmailResetPassword(user.email, resultCreateOTP.otp_code)
        return 'please check your email'
    },
    async VerifOTP(user) {
        const isValid = validator.validate(user, OTPSchema)
        validator.check(isValid)

        const FindByEmail = await AuthRepository.FindByEmail(user.email)
        if (!FindByEmail) throw NotFoundError('email not found')

        const FindOTP = await AuthRepository.FindOTP(FindByEmail.id)
        if (!FindOTP) throw NotFoundError('please request resend otp')
        user.user_id = FindByEmail.id
        user.otp_id = FindOTP.id

        if (FindOTP.otp_code != user.otp) throw BadRequestError('invalid otp')

        const currentD = Date.now()
        const otpDate = Date.parse(FindOTP.created_at)
        const differtime = currentD - otpDate
        if (differtime > (3600 * 1000)) {
            await AuthRepository.DeleteOTP(FindOTP.id)
            throw BadRequestError('otp expired')
        }
    },
    async ForgotPassword(user) {
        await this.VerifOTP(user)
        user.password = await GeneratePassword(user.password)
        const client = await db.Pool.connect()
        const tx = db.transaction(client)
        try {
            tx.BEGIN()
            await AuthRepository.Update({ id: user.user_id, password: user.password })
            await AuthRepository.DeleteOTP(user.otp_id)
            tx.COMMIT()
            return 'password updated'
        } catch (error) {
            tx.ROLLBACK()
            throw error
        } finally {
            client.release()
        }

    },
    async RegistrationVerify(user) {
        await this.VerifOTP(user)
        const client = await db.Pool.connect()
        const tx = db.transaction(client)
        try {
            tx.BEGIN()
            await UserRepository.Update({ id: user.user_id, is_verified: true })
            await AuthRepository.DeleteOTP(user.otp_id)
            tx.COMMIT()
            return 'registration success'
        } catch (error) {
            tx.ROLLBACK()
            throw error
        } finally {
            client.release()
        }
    }
})

export default AuthService