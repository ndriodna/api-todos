import express from "express"
import todoContainer from "../container/TodoContainer.js";

const router = express.Router()

const TodoController = todoContainer.TodoController

router.get('/', TodoController.FindAll)
router.get('/:id', TodoController.FindOne)
router.post('/create', TodoController.Create)
router.put('/update/:id', TodoController.Update)
router.delete('/remove/:id', TodoController.Delete)

export default router 