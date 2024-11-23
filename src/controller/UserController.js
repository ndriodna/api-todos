import { response } from "../utils/response.js"

const UserController = (UserService) => ({
    FindAll: async (req, res, next) => {
        try {
            const users = await UserService.FindAll()
            return response(res, 200, 'OK', users)
        } catch (error) {
            next(error)
        }
    },
    FindOne: async (req, res, next) => {
        try {
            const user = await UserService.FindOne(req)
            return response(res, 200, 'OK', user)
        } catch (error) {
            next(error)
        }
    },
    Update: async (req, res, next) => {
        try {
            const updated = await UserService.Update(req)
            return response(res, 201, 'Updated', updated)
        } catch (error) {
            next(error)
        }
    },
    Delete: async (req, res, next) => {
        try {
            await UserService.Delete(req)
            return response(res, 201, 'Deleted')
        } catch (error) {
            next(error)
        }
    }
})

export default UserController