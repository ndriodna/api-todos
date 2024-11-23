import { NotFoundError, UnauthorizedError } from "../exception/error.js"
import { UserFindSchema, UserUpdateSchema } from "../validator/UserSchema.js"

const UserService = (UserRepository, validator) => ({
    FindAll: async () => {
        return await UserRepository.FindAll()
    },
    FindOne: async (req) => {
        const id = req.user.id
        const isValid = validator.validate({ id: id }, UserFindSchema)
        validator.check(isValid)
        const find = await UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return find
    },
    Update: async (user) => {
        const id = user.user.id
        const isValid = validator.validate(user.body, UserUpdateSchema)
        validator.check(isValid)
        const find = await UserRepository.FindOne(id)
        if (find.id !== id) throw UnauthorizedError(`you don't have permission to edit this user`)

        user.body.full_name ? user.body.full_name : user.body.full_name = find.full_name
        user.body.phone ? user.body.phone : user.body.phone = find.phone
        user.body.address ? user.body.address : user.body.address = find.address

        return await UserRepository.Update(find.id, user.body)
    },
    Delete: async (req) => {
        const id = req.user.id
        const isValid = validator.validate({ id: id }, UserFindSchema)
        validator.check(isValid)
        const find = UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return await UserRepository.Delete(find.id)
    }
})

export default UserService