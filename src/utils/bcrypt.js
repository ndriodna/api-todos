import bycrypt from 'bcrypt'
import { InternalServerError, UnauthorizedError } from '../exception/error'

const saltOrRounds = 10

export const GeneratePassword = (password) => {
    return new Promise((resolve, reject) => {
        bycrypt.hash(password, saltOrRounds, (err, encrypted) => {
            if (err) reject(InternalServerError(err))
            resolve(encrypted)
        })
    })
}
export const CheckPassword = (password, encrypted) => {
    return new Promise((resolve, reject) => {
        bycrypt.compare(password, encrypted, (err, result) => {
            if (err) reject(UnauthorizedError(err))
            resolve(result)
        })
    })
} 