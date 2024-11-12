const TodoService = (TodoRepository) => ({
    FindAll: async () => {
        try {
            const result = await TodoRepository.FindAll()
            return result
        } catch (e) {
            throw new Error(e.message)
        }
    },

    FindOne: (id) => {

    },

    Create: () => {

    },

    Update: (id) => {

    },

    Delete: (id) => {

    }
})

export default TodoService