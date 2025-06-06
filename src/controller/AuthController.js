import { resClearCookie, resCookie, response } from "../utils/response.js"

const AuthController = (AuthService) => ({
    Auth: async (req, res, next) => {
        try {
            const result = await AuthService.Auth(req, res)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    Login: async (req, res, next) => {
        try {
            const result = await AuthService.Login(req.body)
            resCookie(res, result)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    LoginGoogle: async (req, res, next) => {
        try {
            const result = await AuthService.LoginGoogle(req.body)
            resCookie(res, result)
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
            const result = await AuthService.ForgotPassword(req.body)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    Logout: async (req, res, next) => {
        try {
            const result = AuthService.Logout(req, res)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    SendOTP: async (req, res, next) => {
        try {
            const result = await AuthService.SendOTP(req.body)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    },
    RegistrationVerify: async (req, res, next) => {
        try {
            const result = await AuthService.RegistrationVerify(req.body)
            return response(res, 200, 'OK', result)
        } catch (error) {
            next(error)
        }
    }
})
export default AuthController