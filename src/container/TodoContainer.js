import todoRepository from "../repository/TodoRepository.js";
import todoService from "../service/TodoService.js";
import todoController from "../controller/TodoController.js";
import { db } from "../db/db.js"

const container = {
    TodoController: todoController(todoService(todoRepository(db)))
}
export default container