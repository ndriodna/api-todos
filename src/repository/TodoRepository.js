const TodoRepository = (db) => ({

    FindAll: async () => {
        try {
            const q = await db.query('select * from todo')
            return q.rows
        } catch (e) {
            throw new Error(e.message)
        }
    },

    FindOne: async (id) => {
        try {
            const find = await db.query('select * from todo where id = $1', [id])
            return find.rows
        } catch (e) {
            throw new Error(e.message)
        }
    },

    Create: async (todo) => {
        try {
            const result = await db.query('insert into todo(id, name, status, date) values(DEFAULT, $1, $2, $3)', [todo.name, todo.status, todo.date])
            return result.rows[0]
        } catch (e) {
            throw new Error(e.message)
        }
    },

    Update: async (id, todo) => {
        try {
            const result = await db.query('update todo set name = $2, status = $3, date = $4 where id = $1', [id, todo.name, todo.status, todo.date])
            return result.rows[0]
        } catch (e) {
            throw new Error(e.message)
        }
    },

    Delete: async (id) => {
        try {
            await db.query('delete from todo where id = $1', [id])
        } catch (e) {
            throw new Error(e.message)
        }
    }
})

export default TodoRepository