import { InternalServerError } from "../exception/error"

export const AuthRepository = (db) => ({
    Auth: async (id) => {
        try {
            const q = 'select * from users where id = $1'
            const result = await db.query(q, [id])
            return result.rows[0]
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Login: async () => {
        try {
        } catch (error) {
            throw InternalServerError(error.message)
        }
    },
    Register: async (user) => {
        const client = await db.connect()
        const tx = db.transaction(client)
        try {
            await tx.BEGIN()
            const qUser = 'insert into users(email,username,password) values ($1) returning id,username'
            const qDetail = 'insert into user_detais(user_id) values($1)'
            const resultUser = await db.query(qUser, [user])
            await db.query(qDetail, [resultUser.rows[0].id])
            await tx.COMMIT()
            return { id: resultUser.rows[0].id, username: resultUser.rows[0].username }
        } catch (error) {
            await tx.ROLLBACK()
            throw InternalServerError(error.message)
        } finally {
            client.release()
        }
    }
})