import { InternalServerError, NotFoundError } from "../exception/error.js"
import { sanitize } from "../helper/regex.js"

const TodoService = (TodoRepository) => ({
    FindAll: async () => {
        try {
            return await TodoRepository.FindAll()
        } catch (e) {
            throw InternalServerError(e.message)
        }
    },

    FindOne: async (id) => {
        try {
            const find = await TodoRepository.FindOne(id)
            if (!find) throw NotFoundError()
            return find
        } catch (e) {
            if (e.code !== 404) {
                throw InternalServerError(e.message)
            }
            throw e
        }
    },

    Create: async (todo) => {
        try {
            todo.name = sanitize(todo.name)
            todo.status = sanitize(todo.status)
            todo.date = new Date().toISOString()
            return await TodoRepository.Create(todo)
        } catch (e) {
            throw InternalServerError(e.message)
        }
    },

    Update: async (id, todo) => {
        try {
            todo.name = sanitize(todo.name)
            todo.status = sanitize(todo.status)
            const find = await TodoRepository.FindOne(id)
            if (!find) throw NotFoundError()
            todo.name ? todo.name : todo.name = find.name
            todo.status ? todo.status : todo.status = find.status
            todo.date = find.date
            const result = await TodoRepository.Update(find.id, todo)
            return result
        } catch (e) {
            if (e.code !== 404) {
                throw InternalServerError(e.message)
            }
            throw e
        }
    },

    Delete: async (id) => {
        try {
            const find = await TodoRepository.FindOne(id)
            if (!find) throw NotFoundError()
            return await TodoRepository.Delete(id)
        } catch (e) {
            if (e.code !== 404) {
                throw InternalServerError(e.message)
            }
            throw e
        }
    }
})

export default TodoService