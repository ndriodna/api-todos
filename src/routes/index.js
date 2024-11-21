import express from "express"
import RegisterTodoRoute from "./todos.js"
import ErrorMiddleware from "../middleware/ErrorMiddleware.js"
import NewAuth from "../container/AuthContainer.js"
import RegisterAuthRoute from "./auth.js"
import * as db from "../db/db.js"
import * as validator from "../validator/Validator.js"
import NewTodo from "../container/TodoContainer.js"
import NewUser from "../container/UserContainer.js"
import RegisterUserRoute from "./user.js"

const router = express.Router()

const AuthHandler = NewAuth(db, validator)
RegisterAuthRoute(router, AuthHandler)

const UserHandler = NewUser(db, validator)
RegisterUserRoute(router, UserHandler)

const TodoHandler = NewTodo(db)
RegisterTodoRoute(router, TodoHandler)

router.use(ErrorMiddleware)
export default router 