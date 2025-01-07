import { BadRequestError, NotFoundError } from "../exception/error.js"
import { CheckPassword, GeneratePassword } from "../utils/bcrypt.js"
import { ForgotPasswordSchema, LoginSchema, RegisterSchema, RegisterVerifySchema, UserFindByEmaildSchema } from "../validator/UserSchema.js"
import { sign } from '../utils/jwt.js';
import { resClearCookie } from "../utils/response.js";
import { SendEmailRegister, SendEmailResetPassword } from '../utils/email.js';
import generateOTP from "../utils/otp.js";

const AuthService = (AuthRepository, UserRepository, db, validator) => ({
    async Auth(user) {
        return user.token
    },
    async Login(user) {
        const isValid = validator.validate(user, LoginSchema)
        validator.check(isValid)
        const result = await AuthRepository.FindByEmail(user.email)
        if (!result) throw NotFoundError('email/password invalid')
        if (!result.verified_at) throw BadRequestError('email not verified');

        await CheckPassword(user.password, result.password)
        const token = await sign({ id: result.id, username: result.username })
        return token
    },
    async Register(user) {
        const client = await db.Pool.connect()
        const tx = db.transaction(client)
        const isValid = validator.validate(user, RegisterSchema)
        validator.check(isValid)
        try {
            await tx.BEGIN()
            user.password = await GeneratePassword(user.password)
            const resultUser = await AuthRepository.Create(user)
            if (!resultUser) throw BadRequestError('email already exist')
            await UserRepository.Create(resultUser.id)
            await this.SendOTP(user)
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

        if (user.otpstatus == 'forgotpassword') {
            await SendEmailResetPassword(user.email, resultCreateOTP.otp_code)
            return 'please check your email'
        } else if (user.otpstatus = 'verify') {
            await SendEmailRegister(user.email, resultCreateOTP.otp_code)
            return 'please check your email'
        }
    },
    async VerifOTP(user) {
        const isValid = validator.validate(user, UserFindByEmaildSchema)
        validator.check(isValid)

        const FindByEmail = await AuthRepository.FindByEmail(user.email)
        if (!FindByEmail) throw NotFoundError('email not found')

        const FindOTP = await AuthRepository.FindOTP(FindByEmail.id)
        if (!FindOTP) throw NotFoundError('please request resend otp')

        user.user_id = FindByEmail.id
        user.otp_id = FindOTP.id

        if (FindOTP.otp_code != user.otp) throw BadRequestError('otp expired')

        const currentD = Date.now()
        const otpDate = Date.parse(FindOTP.created_at)
        const differtime = currentD - otpDate
        if (differtime > (3600 * 1000)) {
            await AuthRepository.DeleteOTP(FindOTP.id)
            throw BadRequestError('otp expired')
        }
    },
    async ForgotPassword(user) {
        const client = await db.Pool.connect()
        const tx = db.transaction(client)
        await this.VerifOTP(user)
        const isValid = validator.validate(user, ForgotPasswordSchema)
        validator.check(isValid)
        try {
            await tx.BEGIN()
            user.password = await GeneratePassword(user.password)
            await AuthRepository.Update({ id: user.user_id, password: user.password })
            await AuthRepository.DeleteOTP(user.otp_id)
            await tx.COMMIT()
            return 'password updated'
        } catch (error) {
            await tx.ROLLBACK()
            throw error
        } finally {
            client.release()
        }

    },
    async RegistrationVerify(user) {
        const client = await db.Pool.connect()
        const tx = db.transaction(client)
        await this.VerifOTP(user)
        const isValid = validator.validate(user, RegisterVerifySchema)
        validator.check(isValid)
        try {
            await tx.BEGIN()
            await AuthRepository.UpdateVerified(user.user_id)
            await AuthRepository.DeleteOTP(user.otp_id)
            await tx.COMMIT()
            return 'registration success'
        } catch (error) {
            await tx.ROLLBACK()
            throw error
        } finally {
            client.release()
        }
    }
})

export default AuthService