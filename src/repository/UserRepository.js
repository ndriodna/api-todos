import { InternalServerError } from "../exception/error.js"

const UserRepository = (db) => ({
    FindAll: async () => {
        try {
            const q = 'select * from users u join user_details ud on u.id = ud.user_id'
            const result = await db.Pool.query(q)
            return result.rows
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    FindOne: async (id) => {
        try {
            const q = 'select * from users u join user_details ud on u.id = ud.user_id where u.id = $1 '
            const result = await db.Pool.query(q, [id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    Create: async (user_id) => {
        try {
            const q = 'insert into user_details(user_id) values($1) returning *'
            const result = await db.Pool.query(q, [user_id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    Update: async (id, user) => {
        try {
            const q = 'update user_details set full_name = $2, phone = $3, address = $4 where id = $1 returning *'
            const result = await db.Pool.query(q, [id, user.full_name, user.phone, user.address])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    Delete: async (id) => {
        try {
            const q = 'delete from users where id = $1'
            await db.Pool.query(q, [id])
        } catch (error) {
            throw InternalServerError(error)
        }
    }
})

export default UserRepository