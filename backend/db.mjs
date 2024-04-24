import dotenv from 'dotenv'
import pg from 'pg'

const { Pool } = pg

dotenv.config()

export const pool = new Pool({
    host : process.env.PGHOST,
    port : process.env.PGPORT,
    database : process.env.PGDATABASE,
    user : process.env.PGUSER,
    password :process.env.PGPASSWORD
})

