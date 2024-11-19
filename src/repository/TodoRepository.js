import { InternalServerError } from "../exception/error.js"

const TodoRepository = (db) => ({

    FindAll: async () => {
        try {
            const q = 'select * from todos'
            const result = await db.query(q)
            return result.rows
        } catch (e) {
            throw InternalServerError(e.message)
        }
    },

    FindOne: async (id) => {
        try {
            const q = 'select * from todos where id = $1'
            const find = await db.query(q, [id])
            return find.rows[0]
        } catch (e) {
            throw InternalServerError(e.message)
        }
    },

    Create: async (todo) => {
        try {
            const q = 'insert into todos(name, status, date) values(DEFAULT, $1, $2, $3) returning *'
            const result = await db.query(q, [todo.name, todo.status, todo.date])
            return result.rows[0]
        } catch (e) {
            throw InternalServerError(e.message)
        }
    },

    Update: async (id, todo) => {
        try {
            const q = 'update todos set name = $2, status = $3, date = $4 where id = $1 returning *'
            const result = await db.query(q, [id, todo.name, todo.status, todo.date])
            return result.rows[0]
        } catch (e) {
            throw InternalServerError(e.message)
        }
    },

    Delete: async (id) => {
        try {
            const q = 'delete from todos where id = $1'
            await db.query(q, [id])
        } catch (e) {
            throw InternalServerError(e.message)
        }
    }
})

export default TodoRepository