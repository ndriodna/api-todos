import { InternalServerError } from "../exception/error"

const UserRepository = (db) => ({
    FindAll: async () => {
        try {
            const result = await db.query('select * from users')
            return result.rows
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    FindOne: async (id) => {
        try {
            const result = await db.query('select * from users where id = $1', [id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Create: async (user) => {
        try {
            const result = await db.query('insert into users(id,full_name,phone,address,user_id) values(DEFAULT,$1,$2,$3,$4) returning *', [user.full_name, user.phone, user.address, user.user_id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Update: async (id, user) => {
        try {
            const result = await db.query('update users set full_name = $2, phone = $3, address = $4 where id = $1 returning *', [id, user.full_name, user.phone, user.address])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Delete: async (id) => {
        try {
            await db.query('delete from users where id = $1', [id])
        } catch (error) {
            throw InternalServerError(error.message)
        }
    }
})

export default UserRepository