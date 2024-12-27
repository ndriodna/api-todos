import bcrypt from 'bcrypt'
import { InternalServerError, UnauthorizedError } from '../exception/error.js'

const saltRounds = 10

export const GeneratePassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, encrypted) => {
            if (err) {
                reject(InternalServerError(err))
            }
            resolve(encrypted)
        })
    })
}
export const CheckPassword = (password, encrypted) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encrypted, (err, result) => {
            if (err) {
                reject(UnauthorizedError(err))
            } else if (!result) {
                reject(UnauthorizedError('password invalid'))
            }
            resolve(result)
        })
    })
} 