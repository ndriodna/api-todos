import todoRepository from "../repository/TodoRepository.js";
import todoService from "../service/TodoService.js";
import todoController from "../controller/TodoController.js";
import { db } from "../db/db.js"


const TodoRepository = todoRepository(db)
const TodoService = todoService(TodoRepository)
const TodoController = todoController(TodoService)

export { TodoController }