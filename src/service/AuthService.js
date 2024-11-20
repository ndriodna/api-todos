import { InternalServerError, UnauthorizedError } from "../exception/error"
import { CheckPassword, GeneratePassword } from "../utils/bcrypt"
import { RegisterSchema } from "../validator/UserSchema"
import { check, validate } from "../validator/Validator"
import jwt from '../utils/jwt.js';

const AuthService = (db, AuthRepository, UserRepository) => ({
    Auth: async (token) => {
        if (!token) throw UnauthorizedError('token expired please re-login')
        await jwt.verif(token)
    },
    Login: async (user) => {
        // bycrypt check
        const result = await AuthRepository.FindByEmail(user.email)
        await CheckPassword(user.password, result.password)
        const token = await jwt.sign(user)
        return token
    },
    Register: async (user) => {
        const client = await db.connect()
        const tx = db.transaction(client)
        try {
            const isValid = validate(user, RegisterSchema)
            check(isValid)
            await tx.BEGIN()
            user.password = await GeneratePassword(user.password)
            const resultUser = await AuthRepository.Create(user)
            await UserRepository.Create(resultUser.id)
            await tx.COMMIT()
            return resultUser
        } catch (error) {
            await tx.ROLLBACK()
            throw InternalServerError(error.message)
        } finally {
            client.release()
        }
    }
})

export default AuthService