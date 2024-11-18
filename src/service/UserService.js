import { NotFoundError } from "../exception/error"
import { UserCraeteSchema, UserFindSchema, UserUpdateSchema } from "../validator/UserSchema"
import { check, validate } from "../validator/Validator"

const UserService = (UserRepository) => ({
    FindAll: async () => {
        return await UserRepository.FindAll()
    },
    FindOne: async (id) => {
        const isValid = validate({ id: id }, UserFindSchema)
        check(isValid)
        const find = await UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return find
    },
    Create: async (user) => {
        const isValid = validate(user, UserCraeteSchema)
        check(isValid)
        return await UserRepository.Create(user)
    },
    Update: async (id, user) => {
        user.id = id
        const isValid = validate(user, UserUpdateSchema)
        check(isValid)
        const find = await UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        user.full_name ? user.full_name : user.full_name = find.full_name
        user.phone ? user.phone : user.phone = find.phone
        user.address ? user.address : user.address = find.address
        return await UserRepository.Update(find.id, user)
    },
    Delete: async (id) => {
        const isValid = validate({ id: id }, UserFindSchema)
        check(isValid)
        const find = UserRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return await UserRepository.Delete(find.id)
    }
})

export default UserService