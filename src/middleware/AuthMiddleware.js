import { UnauthorizedError } from "../exception/error.js"
import { verif } from "../utils/jwt.js"
import { resClearCookie } from "../utils/response.js"

export default async function AuthMiddleware(req, res, next) {
    try {
        const tokenHeader = req.cookies.Authorization
        if (!tokenHeader) throw UnauthorizedError('token not found please re-login')
        req.token = tokenHeader
        const decoded = await verif(req.token)
        req.user = decoded
        next()
    } catch (error) {
        resClearCookie(res, req.token)
        next(error)
    }
}