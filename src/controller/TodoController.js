import { response } from "../helper/response.js"

const TodoController = (TodoService) => ({
    FindAll: async (req, res) => {
        try {
            const result = await TodoService.FindAll()
            return response(res, 200, 'OK', result)
        } catch (e) {
            return response(res, 500, 'Error', e.message)
        }
    },

    FindOne: async (req, res) => {
        try {
            const result = await TodoService.FindOne(req.params.id)
            return response(res, 200, 'Ok', result)
        } catch (e) {
            return response(res, e.code, e.status, e.message)
        }
    },

    Create: async (req, res) => {
        try {
            const result = await TodoService.Create(req.body)
            return response(res, 201, 'created', result)
        } catch (e) {
            return response(res, e.code, e.status, e.message)
        }
    },

    Update: async (req, res) => {
        try {
            const result = await TodoService.Update(req.params.id, req.body)
            return response(res, 201, 'updated', result)
        } catch (e) {
            return response(res, e.code, e.status, e.message)
        }
    },

    Delete: async (req, res) => {
        try {
            await TodoService.Delete(req.params.id)
            return response(res, 201, 'deleted', `success delete`)
        } catch (e) {
            return response(res, e.code, e.status, e.message)
        }
    }

})
export default TodoController