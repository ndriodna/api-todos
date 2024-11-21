import { InternalServerError } from "../exception/error.js"

const TodoRepository = (db) => ({

    FindAll: async () => {
        try {
            const q = 'select * from todos'
            const result = await db.Pool.query(q)
            return result.rows
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    FindOne: async (id) => {
        try {
            const q = 'select * from todos where id = $1'
            const find = await db.Pool.query(q, [id])
            return find.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    Create: async (todo) => {
        try {
            const q = 'insert into todos(name, status,user_id) values(DEFAULT, $1, $2) returning *'
            const result = await db.Pool.query(q, [todo.name, todo.status, todo.user_id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    Update: async (id, todo) => {
        try {
            const q = 'update todos set name = $2, status = $3, date = $4 where id = $1 returning *'
            const result = await db.Pool.query(q, [id, todo.name, todo.status])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    Delete: async (id) => {
        try {
            const q = 'delete from todos where id = $1'
            await db.Pool.query(q, [id])
        } catch (error) {
            throw InternalServerError(error)
        }
    }
})

export default TodoRepository