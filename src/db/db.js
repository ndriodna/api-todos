import pg from 'pg';


export const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    max: 10
})

export const query = (text, value) => {
    return db.query(text, value);
}

