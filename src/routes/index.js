import express from "express"
import todoContainer from "../container/TodoContainer.js";

const router = express.Router()

const TodoController = todoContainer.TodoController

router.get('/', TodoController.FindAll)
// router.get('/:id', GetTodo)
// router.post('/create', PostTodo)
// router.patch('/update/:id', UpdateTodo)
// router.delete('/remove/:id', DeleteTodo)

export default router 