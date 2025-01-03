import { InternalServerError } from "../exception/error.js"

export const AuthRepository = (db) => ({
    FindById: async (id) => {
        try {
            const q = 'select * from users where id = $1'
            const result = await db.Pool.query(q, [id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    FindByEmail: async (email) => {
        try {
            const q = 'select * from users where email = $1'
            const result = await db.Pool.query(q, [email])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    Create: async (user) => {
        try {
            const qUser = 'insert into users(email,username,password) values ($1, $2, $3) on conflict (email) do nothing returning id, email, username'
            const resultUser = await db.Pool.query(qUser, [user.email, user.username, user.password])
            if (resultUser.rowCount === 0) return null
            return { id: resultUser.rows[0].id, username: resultUser.rows[0].username }
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    Update: async (user) => {
        try {
            const qUser = 'update users set password = $2, updated_at = now() where id = $1'
            await db.Pool.query(qUser, [user.id, user.password])
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    Delete: async (user) => {
        try {
            const qUser = 'delete users where id = $1'
            await db.Pool.query(qUser, [user])
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    FindOTP: async (user_id) => {
        try {
            const qUser = 'select * from otp where user_id = $1'
            const result = await db.Pool.query(qUser, [user_id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    CreateOTP: async (user) => {
        try {
            const qUser = 'insert into otp(user_id,otp_code) values($1,$2) returning user_id, otp_code'
            const result = await db.Pool.query(qUser, [user.user_id, user.otp_code])
            return { user_id: result.rows[0].user_id, otp_code: result.rows[0].otp_code }
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    DeleteOTP: async (user) => {
        try {
            const qUser = 'delete from otp where id = $1'
            await db.Pool.query(qUser, [user])
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    UpdateVerified: async (user) => {
        try {
            const qUser = 'update users set verified_at = now() where id = $1'
            await db.Pool.query(qUser, [user])
        } catch (error) {
            throw InternalServerError(error)
        }
    }

})

export default AuthRepository