const TodoRepository = (db) => ({

    FindAll: async () => {
        try {
            const q = await db.query('select * from todo')
            return q.rows
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

export default TodoRepository