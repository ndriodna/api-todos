import { response } from "../utils/response.js"
import Atoi from "../utils/strconv"

const UserController = (UserService) => ({
    FindAll: async (req, res, next) => {
        try {
            const users = await UserService.FindAll()
            return response(res, code, 'OK', users)
        } catch (error) {
            next(error)
        }
    },
    FindOne: async (req, res, next) => {
        try {
            const id = Atoi(req.params.id)
            const user = await UserService.FindOne(id)
            return response(res, 200, 'OK', user)
        } catch (error) {
            next(error)
        }
    },
    Create: async (req, res, next) => {
        try {
            const created = await UserService.Create(req.body)
            return response(res, 201, 'Created', created)
        } catch (error) {
            next(error)
        }
    },
    Update: async (req, res, next) => {
        try {
            const id = Atoi(req.params.id)
            const updated = await UserService.Update(id, req.body)
            return response(res, 201, 'Updated', updated)
        } catch (error) {
            next(error)
        }
    },
    Delete: async (req, res, next) => {
        try {
            const id = Atoi(id)
            await UserService.Delete(id)
            return response(res, 201, 'Deleted')
        } catch (error) {
            next(error)
        }
    }
})

export default UserController