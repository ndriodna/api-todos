import todoContainer from "../container/TodoContainer.js";

export default function TodoRoute(router) {

    const TodoController = todoContainer.TodoController

    router.get('/', TodoController.FindAll)
    router.get('/:id', TodoController.FindOne)
    router.post('/create', TodoController.Create)
    router.put('/update/:id', TodoController.Update)
    router.delete('/remove/:id', TodoController.Delete)
}
