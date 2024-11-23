import AuthMiddleware from "../middleware/AuthMiddleware.js"

export default function RegisterUserRoute(router, handler) {
    router.use(AuthMiddleware)
    router.get('/users', handler.FindAll)
    router.get('/user/auth', handler.FindOne)
    router.put('/user/update', handler.Update)
    router.delete('/user/delete/:id', handler.Delete)
}