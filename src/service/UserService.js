import { NotFoundError } from "../exception/error.js"
import { UserCraeteSchema, UserFindSchema, UserUpdateSchema } from "../validator/UserSchema.js"

const UserService = (UserRepository, validator) => ({
    FindAll: async () => {
        return await UserRepository.FindAll()
    },
    FindOne: async (id) => {
        const isValid = validator.validate({ id: id }, UserFindSchema)
        validator.check(isValid)
        const find = await UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return find
    },
    Create: async (user) => {
        const isValid = validator.validate(user, UserCraeteSchema)
        validator.check(isValid)
        return await UserRepository.Create(user)
    },
    Update: async (id, user) => {
        user.id = id
        const isValid = validator.validate(user, UserUpdateSchema)
        validator.check(isValid)
        const find = await UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        user.full_name ? user.full_name : user.full_name = find.full_name
        user.phone ? user.phone : user.phone = find.phone
        user.address ? user.address : user.address = find.address
        return await UserRepository.Update(find.id, user)
    },
    Delete: async (id) => {
        const isValid = validator.validate({ id: id }, UserFindSchema)
        validator.check(isValid)
        const find = UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return await UserRepository.Delete(find.id)
    }
})

export default UserService