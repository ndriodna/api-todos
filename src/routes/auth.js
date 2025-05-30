import AuthMiddleware from "../middleware/AuthMiddleware.js"

export default function RegisterAuthRoute(router, handler) {
    router.get('/auth', AuthMiddleware, handler.Auth)
    router.post('/auth/login', handler.Login)
    router.post('/auth/login/google', handler.LoginGoogle)
    router.post('/auth/register', handler.Register)
    router.post('/auth/logout', handler.Logout)
    router.post('/auth/send-otp', handler.SendOTP)
    router.post('/auth/forgot', handler.ForgotPassword)
    router.post('/auth/verify', handler.RegistrationVerify)
}