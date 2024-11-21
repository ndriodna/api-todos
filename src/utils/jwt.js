import jwt from 'jsonwebtoken'
import { BadRequestError, UnauthorizedError } from '../exception/error.js'

const secretKey = process.env.SECRET_KEY
export function sign(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn: '1d' }, (err, encoded) => {
            if (err) {
                reject(BadRequestError('payload is invalid'))
            }
            resolve(encoded)
        })
    })
}

export function verif(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(UnauthorizedError('token invalid please re-login'))
            }
            resolve(decoded)
        })
    })
}