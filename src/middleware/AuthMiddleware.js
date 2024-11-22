import { UnauthorizedError } from "../exception/error.js"
import { verif } from "../utils/jwt.js"

export default async function AuthMiddleware(req, res, next) {
    try {
        const tokenHeader = req.get('Authorization')
        if (!tokenHeader) throw UnauthorizedError('token not found please re-login')
        if (!tokenHeader.startsWith('Bearer')) throw UnauthorizedError('format token invalid')
        req.token = tokenHeader.split(' ')[1]
        const decoded = await verif(req.token)
        req.user = decoded
        next()
    } catch (error) {
        next(error)
    }
}