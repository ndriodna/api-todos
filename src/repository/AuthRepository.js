import { InternalServerError } from "../exception/error"

export const AuthRepository = (db) => ({
    FindById: async (id) => {
        try {
            const q = 'select email,username from users where id = $1'
            const result = await db.query(q, [id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    FindByEmail: async (email) => {
        try {
            const q = 'select email,username from users where email = $1'
            const result = await db.query(q, [email])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Create: async (user) => {
        try {
            const qUser = 'insert into users(email,username,password) values ($1) returning id, email, username'
            const resultUser = await db.query(qUser, [user])
            return { id: resultUser.rows[0].id, username: resultUser.rows[0].username }
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Update: async (user) => {
        try {
            const qUser = 'update users set password = $2 where id = $1'
            await db.query(qUser, [user])
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Delete: async (user) => {
        try {
            const qUser = 'delete users where id = $1'
            await db.query(qUser, [user])
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },

})