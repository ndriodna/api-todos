import { NotFoundError } from "../exception/error.js"
import { CreateSchema, UpadteSchema, FindSchema } from "../validator/UserSchema.js"
import { check, validate } from "../validator/Validator.js"

const TodoService = (TodoRepository) => ({
    FindAll: async () => {
        return await TodoRepository.FindAll()
    },

    FindOne: async (id) => {
        const isValid = validate({ id: id }, FindSchema)
        check(isValid)
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return find
    },

    Create: async (todo) => {
        const isValid = validate(todo, CreateSchema)
        check(isValid)
        todo.date = new Date().toISOString()
        return await TodoRepository.Create(todo)
    },

    Update: async (id, todo) => {
        todo.id = id
        const isValid = validate(todo, UpadteSchema)
        check(isValid)
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        todo.name ? todo.name : todo.name = find.name
        todo.status ? todo.status : todo.status = find.status
        todo.date = find.date
        const result = await TodoRepository.Update(find.id, todo)
        return result
    },

    Delete: async (id) => {
        const isValid = validate({ id: id }, FindSchema)
        check(isValid)
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return await TodoRepository.Delete(id)
    }
})

export default TodoService