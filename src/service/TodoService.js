import { BadRequestError, InternalServerError, NotFoundError } from "../exception/error.js"
import { isId, sanitize } from "../helper/regex.js"

const TodoService = (TodoRepository) => ({
    FindAll: async () => {
        return await TodoRepository.FindAll()
    },

    FindOne: async (id) => {
        if (!isId(id)) throw BadRequestError('ID must be number')
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return find
    },

    Create: async (todo) => {
        todo.name = sanitize(todo.name)
        todo.status = sanitize(todo.status)
        todo.date = new Date().toISOString()
        return await TodoRepository.Create(todo)
    },

    Update: async (id, todo) => {
        if (!isId(id)) throw BadRequestError('ID must be number')
        todo.name = sanitize(todo.name)
        todo.status = sanitize(todo.status)
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        todo.name ? todo.name : todo.name = find.name
        todo.status ? todo.status : todo.status = find.status
        todo.date = find.date
        const result = await TodoRepository.Update(find.id, todo)
        return result
    },

    Delete: async (id) => {
        if (!isId(id)) throw BadRequestError('ID must be number')
        const find = await TodoRepository.FindOne(id)
        if (!find) throw NotFoundError()
        return await TodoRepository.Delete(id)
    }
})

export default TodoService