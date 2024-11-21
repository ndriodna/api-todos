import pg from 'pg';


export const Pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    max: 10
})

export const transaction = (client) => ({
    BEGIN: () => {
        return client.query('BEGIN')
    },
    COMMIT: () => {
        return client.query('COMMIT')
    },
    ROLLBACK: () => {
        return client.query('ROLLBACK')
    }
})