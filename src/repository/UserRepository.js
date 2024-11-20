import { InternalServerError } from "../exception/error"

const UserRepository = (db) => ({
    FindAll: async () => {
        try {
            const q = 'select * from users u join user_details ud on u.id = ud.user_id'
            const result = await db.query(q)
            return result.rows
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    FindOne: async (id) => {
        try {
            const q = 'select * from users u join user_details ud on u.id = ud.user_id where id = $1 '
            const result = await db.query(q, [id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Create: async (user_id) => {
        try {
            const q = 'insert into user_details(user_id) values($1) returning *'
            const result = await db.query(q, [user_id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Update: async (id, user) => {
        try {
            const q = 'update user_details set full_name = $2, phone = $3, address = $4 where id = $1 returning *'
            const result = await db.query(q, [id, user.full_name, user.phone, user.address])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Delete: async (id) => {
        try {
            const q = 'delete from users where id = $1'
            await db.query(q, [id])
        } catch (error) {
            throw InternalServerError(error.message)
        }
    }
})

export default UserRepository