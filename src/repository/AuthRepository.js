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
            const qUser = 'insert into users(email,username,password) values ($1, $2, $3) returning id, email, username'
            const resultUser = await db.Pool.query(qUser, [user.email, user.username, user.password])
            return { id: resultUser.rows[0].id, username: resultUser.rows[0].username }
        } catch (error) {
            throw InternalServerError(error)
        }
    },
    Update: async (user) => {
        try {
            const qUser = 'update users set password = $2 where id = $1'
            await db.Pool.query(qUser, [user])
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

})

export default AuthRepository