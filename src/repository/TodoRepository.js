const TodoRepository = (db) => ({

    FindAll: async () => {
        try {
            const result = await db.query('select * from todo')
            return result.rows
        } catch (e) {
            throw e
        }
    },

    FindOne: async (id) => {
        try {
            const find = await db.query('select * from todo where id = $1', [id])
            return find.rows[0]
        } catch (e) {
            throw e
        }
    },

    Create: async (todo) => {
        try {
            const result = await db.query('insert into todo(id, name, status, date) values(DEFAULT, $1, $2, $3) returning *', [todo.name, todo.status, todo.date])
            return result.rows[0]
        } catch (e) {
            throw e
        }
    },

    Update: async (id, todo) => {
        try {
            const result = await db.query('update todo set name = $2, status = $3, date = $4 where id = $1 returning *', [id, todo.name, todo.status, todo.date])
            return result.rows[0]
        } catch (e) {
            throw e
        }
    },

    Delete: async (id) => {
        try {
            await db.query('delete from todo where id = $1', [id])
        } catch (e) {
            throw e
        }
    }
})

export default TodoRepository