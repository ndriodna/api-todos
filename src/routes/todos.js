import AuthMiddleware from "../middleware/AuthMiddleware.js"

export default function RegisterTodoRoute(router, handler) {
    router.use(AuthMiddleware)
    router.get('/', handler.FindAll)
    router.get('/todo/:id', handler.FindOne)
    router.post('/todo/create', handler.Create)
    router.put('/todo/update/:id', handler.Update)
    router.delete('/todo/delete/:id', handler.Delete)
}
