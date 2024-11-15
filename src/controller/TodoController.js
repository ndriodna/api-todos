import { response } from "../helper/response.js"

const TodoController = (TodoService) => ({
    FindAll: async (req, res, next) => {
        try {
            const result = await TodoService.FindAll()
            return response(res, 200, 'OK', result)
        } catch (err) {
            next(err)
        }
    },

    FindOne: async (req, res, next) => {
        try {
            const result = await TodoService.FindOne(req.params.id)
            return response(res, 200, 'Ok', result)
        } catch (err) {
            next(err)
        }
    },

    Create: async (req, res, next) => {
        try {
            const result = await TodoService.Create(req.body)
            return response(res, 201, 'created', result)
        } catch (err) {
            next(err)
        }
    },

    Update: async (req, res, next) => {
        try {
            const result = await TodoService.Update(req.params.id, req.body)
            return response(res, 201, 'updated', result)
        } catch (err) {
            next(err)
        }
    },

    Delete: async (req, res, next) => {
        try {
            await TodoService.Delete(req.params.id)
            return response(res, 201, 'deleted', `success delete`)
        } catch (err) {
            next(err)
        }
    }

})
export default TodoController