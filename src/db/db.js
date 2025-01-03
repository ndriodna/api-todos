import pg from 'pg';


export const Pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    max: 10
})

// override the query method to log the sql query
Pool.on('connect', (client) => {
    const originalQuery = client.query;
    client.query = (...args) => {
        console.log('query log: ', args[0]);
        return originalQuery.apply(client, args);
    };
});
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