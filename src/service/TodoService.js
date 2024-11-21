import { NotFoundError } from "../exception/error.js"
import { CreateSchema, UpadteSchema, FindSchema } from "../validator/TodoSchema.js"

const TodoService = (TodoRepository, validator) => ({
    FindAll: async () => {
        return await TodoRepository.FindAll()
    },

    FindOne: async (id) => {
        const isValid = validator.validate({ id: id }, FindSchema)
        validator.check(isValid)
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return find
    },

    Create: async (todo) => {
        const isValid = validator.validate(todo, CreateSchema)
        validator.check(isValid)
        todo.date = new Date().toISOString()
        return await TodoRepository.Create(todo)
    },

    Update: async (id, todo) => {
        todo.id = id
        const isValid = validator.validate(todo, UpadteSchema)
        validator.check(isValid)
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        todo.name ? todo.name : todo.name = find.name
        todo.status ? todo.status : todo.status = find.status
        todo.date = find.date
        const result = await TodoRepository.Update(find.id, todo)
        return result
    },

    Delete: async (id) => {
        const isValid = validator.validate({ id: id }, FindSchema)
        validator.check(isValid)
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return await TodoRepository.Delete(id)
    }
})

export default TodoService