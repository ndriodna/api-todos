import { NotFoundError, UnauthorizedError } from "../exception/error.js"
import Atoi from "../utils/strconv.js"
import { CreateSchema, FindSchema, UpdateSchema } from "../validator/TodoSchema.js"

const TodoService = (TodoRepository, validator) => ({
    FindAll: async (todo) => {
        return await TodoRepository.FindAllOwnUser(todo.user.id)
    },
    FindOne: async (todo) => {
        const id = Atoi(todo)
        const user_id = todo.user.id
        const idValidate = validator.validate({ id: id }, FindSchema)
        validator.check(idValidate)

        const find = await TodoRepository.FindOneOwnUser(id, user_id)
        if (!find) throw NotFoundError()
        return find
    },

    Create: async (todo) => {
        todo.body.user_id = todo.user.id
        const isValid = validator.validate(todo.body, CreateSchema)
        validator.check(isValid)
        console.log('service create todo', todo.body)
        return await TodoRepository.Create(todo.body)
    },

    Update: async (todo) => {
        const id = Atoi(todo)
        todo.body.id = id

        const isValid = validator.validate(todo.body, UpdateSchema)
        validator.check(isValid)

        const find = await TodoRepository.FindOneOwnUser(id, todo.user.id)
        if (!find) throw UnauthorizedError(`you don't have permission to update this todo`)

        todo.body.name ? todo.body.name : todo.body.name = find.name
        todo.body.status ? todo.body.status : todo.body.status = find.status

        const result = await TodoRepository.Update(find.id, todo.body)
        return result
    },

    Delete: async (todo) => {
        const id = Atoi(todo)
        const isValid = validator.validate({ id: id }, FindSchema)
        validator.check(isValid)

        const find = await TodoRepository.FindOneOwnUser(id, todo.user.id)
        if (!find) throw UnauthorizedError(`you don't have permission to delete this todo`)

        return await TodoRepository.Delete(id)
    }
})

export default TodoService