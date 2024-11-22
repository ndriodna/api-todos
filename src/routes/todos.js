import AuthMiddleware from "../middleware/AuthMiddleware.js"

export default function RegisterTodoRoute(router, handler) {
    router.use(AuthMiddleware)
    router.get('/', handler.FindAll)
    router.get('/:id', handler.FindOne)
    router.post('/create', handler.Create)
    router.put('/update/:id', handler.Update)
    router.delete('/remove/:id', handler.Delete)
}
