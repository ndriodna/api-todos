import express from "express"
import TodoRoute from "./todos.js"
import ErrorMiddleware from "../middleware/ErrorMiddleware.js"

const router = express.Router()

TodoRoute(router)

router.use(ErrorMiddleware)
export default router 