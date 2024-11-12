import { response } from "../helper/response.js"

export function GetTodos(req, res, next) {
    return response(res, 200, 'ok', `${req.method}, todos`)
}

export function GetTodo(req, res, next) {
    return response(res, 200, 'ok', `${req.params.id}, get`)
}

export function PostTodo(req, res, next) {
    return response(res, 201, 'created', req.body)
}

export function UpdateTodo(req, res, next) {
    return response(res, 201, 'updated', `${req.params.id}, update`)

}

export function DeleteTodo(req, res, next) {
    return response(res, 201, 'deleted', `${req.params.id}, delete`)
}

