import { InternalServerError } from "../exception/error.js"

const TodoRepository = (db) => ({

    FindAll: async () => {
        try {
            const q = 'select t.*,u.email,u.username from todos t join users u on u.id = t.user_id'
            const result = await db.Pool.query(q)
            return result.rows
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    FindAllOwnUser: async (id) => {
        try {
            const q = 'select * from todos where user_id = $1'
            const result = await db.Pool.query(q, [id])
            return result.rows
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    FindOne: async (id) => {
        try {
            const q = 'select t.*, u.email,u.username from todos t join users u on u.id = t.user_id where t.id = $1'
            const find = await db.Pool.query(q, [id])
            return find.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    FindOneOwnUser: async (id, user_id) => {
        try {
            const q = 'select * from todos where id = $1 and user_id = $2'
            const find = await db.Pool.query(q, [id, user_id])
            return find.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    Create: async (todo) => {
        try {
            const q = 'insert into todos(name,status,user_id) values($1, $2, $3) returning *'
            const result = await db.Pool.query(q, [todo.name, todo.status, todo.user_id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },

    Update: async (id, todo) => {
        try {
            const q = 'update todos set name = $2, status = $3, updated_at = now() where id = $1 returning *'
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