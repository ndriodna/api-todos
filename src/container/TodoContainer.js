import todoRepository from "../repository/TodoRepository.js";
import todoService from "../service/TodoService.js";
import todoController from "../controller/TodoController.js";

export default function NewTodo(db, validator) {
    const TodoRepository = todoRepository(db)
    const TodoService = todoService(TodoRepository, validator)
    const TodoController = todoController(TodoService)
    return TodoController
}