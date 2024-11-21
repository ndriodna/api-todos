import { response } from "../utils/response.js"

const AuthController = (AuthService) => ({
    Auth: async (req, res, next) => {
        try {
            const token = req.body.token
            const result = await AuthService.Auth(token)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    Login: async (req, res, next) => {
        try {
            const result = await AuthService.Login(req.body)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    Register: async (req, res, next) => {
        try {
            const result = await AuthService.Register(req.body)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    ForgotPassword: async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    },
})
export default AuthController