import { BadRequestError, NotFoundError } from "../exception/error.js"
import { CheckPassword, GeneratePassword } from "../utils/bcrypt.js"
import { LoginSchema, OTPSchema, RegisterSchema, UserFindByEmaildSchema } from "../validator/UserSchema.js"
import { sign } from '../utils/jwt.js';
import { resClearCookie } from "../utils/response.js";
import { SendEmailResetPassword } from '../utils/email.js';
import generateOTP from "../utils/otp.js";

const AuthService = (AuthRepository, UserRepository, db, validator) => ({
    Auth: async (user) => {
        return user.token
    },
    Login: async (user) => {
        const isValid = validator.validate(user, LoginSchema)
        validator.check(isValid)
        const result = await AuthRepository.FindByEmail(user.email)
        if (!result) throw NotFoundError('email tidak ditemukan atau belum terdaftar')
        await CheckPassword(user.password, result.password)
        const token = await sign({ id: result.id, username: result.username })
        return token
    },
    Register: async (user) => {
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
    Logout: (req, res) => {
        resClearCookie(res, req.token)
        return 'logout success'
    },
    SendOTP: async (user) => {
        const isValid = validator.validate(user, UserFindByEmaildSchema)
        validator.check(isValid)

        const FindByEmail = await AuthRepository.FindByEmail(user.email)
        if (!FindByEmail) throw NotFoundError()

        user.user_id = FindByEmail.id
        user.otp_code = generateOTP()

        const resultCreateOTP = await AuthRepository.CreateOTP(user)

        await SendEmailResetPassword(user.email, resultCreateOTP.otp_code)
        return 'please check your email'
    },
    ForgotPassword: async (user) => {
        const isValid = validator.validate(user, OTPSchema)
        validator.check(isValid)

        const FindByEmail = await AuthRepository.FindByEmail(user.email)
        if (!FindByEmail) throw NotFoundError()

        const FindOTP = await AuthRepository.FindOTP(FindByEmail.id)
        if (!FindOTP) throw NotFoundError()

        const currentD = Date.now()
        const otpDate = Date.parse(FindOTP.created_at)
        const differtime = currentD - otpDate
        if (differtime > (3600 * 1000)) {
            await AuthRepository.DeleteOTP(FindOTP.id)
            throw BadRequestError('otp expired')
        }
        user.password = await GeneratePassword(user.password)
        await AuthRepository.Update({ id: FindByEmail.id, password: user.password })
        return 'password updated'
    }
})

export default AuthService