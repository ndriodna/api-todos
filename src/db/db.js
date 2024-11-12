import pg from 'pg';

export const db = new pg.Pool({
    connectionString: "postgresql://postgres:secredpwdb@localhost:5432/todos",
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    max: 10
})

export const query = (text, value) => {
    return db.query(text, value);
}

