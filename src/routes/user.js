import AuthMiddleware from "../middleware/AuthMiddleware.js"

export default function RegisterUserRoute(router, handler) {
    router.use(AuthMiddleware)
    router.get('/users', handler.FindAll)
    router.get('/user/:id', handler.FindOne)
    router.post('/user', handler.Create)
    router.put('/user/update/:id', handler.Update)
    router.delete('/user/delete/:id', handler.Delete)
}