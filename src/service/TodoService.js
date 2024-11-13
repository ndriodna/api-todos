const TodoService = (TodoRepository) => ({
    FindAll: async () => {
        try {
            return await TodoRepository.FindAll()
        } catch (e) {
            throw new Error(e.message)
        }
    },

    FindOne: async (id) => {
        try {
            const find = await TodoRepository.FindOne(id)
            if (find.length > 0) return find
            throw new Error('data not found')
        } catch (e) {
            throw new Error(e.message)
        }
    },

    Create: async (todo) => {
        try {
            return await TodoRepository.Create(todo)
        } catch (e) {
            throw new Error(e.message)
        }
    },

    Update: async (id, todo) => {
        try {
            const find = await TodoRepository.FindOne(id)
            if (find.length < 1) throw new Error('data not found')
            return await TodoRepository.Update(find.id, todo)
        } catch (e) {
            throw new Error(e.message)
        }
    },

    Delete: async (id) => {
        try {
            return await TodoRepository.Delete(id)
        } catch (e) {
            throw new Error(e.message)
        }
    }
})

export default TodoService