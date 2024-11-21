export default function RegisterAuthRoute(router, handler) {
    router.post('/auth', handler.Auth)
    router.post('/auth/login', handler.Login)
    router.post('/auth/register', handler.Register)
}