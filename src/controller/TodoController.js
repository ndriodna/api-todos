import {response} from "../helper/response.js"

const TodoController = (TodoService) => ({
    FindAll: async (req, res) => {
        try {
            const result = await TodoService.FindAll()
            return response(res, 200, 'OK', result)
        } catch (e) {
            return response(res, 500, 'Error', e.message)
        }
    },

    FindOne: (req, res) => {
        return response(res, 200, 'ok', `${req.params.id}, get`)
    },

    Create: (req, res) => {
        return response(res, 201, 'created', req.body)
    },

    Update: (req, res) => {
        return response(res, 201, 'updated', `${req.params.id}, update`)

    },

    Delete: (req, res) => {
        return response(res, 201, 'deleted', `${req.params.id}, delete`)
    }

})
export default TodoController