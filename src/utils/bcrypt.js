import bcrypt from 'bcrypt'
import { InternalServerError, UnauthorizedError } from '../exception/error.js'

const saltRounds = 10

export const GeneratePassword = async (password) => {
    try {
        const encrypted = await bcrypt.hash(password, saltRounds)
        return encrypted
    } catch (error) {
        throw InternalServerError(error)
    }
}
export const CheckPassword = async (password, encrypted) => {
    try {
        const isMatch = await bcrypt.compare(password, encrypted)
        if (!isMatch) throw UnauthorizedError('password invalid')
    } catch (error) {
        throw error
    }
} 