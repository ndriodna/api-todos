import express from "express"
import { DeleteTodo, GetTodo, GetTodos, PostTodo, UpdateTodo } from "../controller/TodoController.js"
const router = express.Router()


router.get('/', GetTodos)
router.get('/:id', GetTodo)
router.post('/create', PostTodo)
router.patch('/update/:id', UpdateTodo)
router.delete('/remove/:id', DeleteTodo)

export default router 