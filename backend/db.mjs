import dotenv from 'dotenv'
import pg from 'pg'

const { Pool } = pg

dotenv.config()

// const devConfig = {
//     host : process.env.PGHOST,
//     port : process.env.PGPORT,
//     database : process.env.PGDATABASE,
//     user : process.env.PGUSER,
//     password :process.env.PGPASSWORD
// }

const prodConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
}

export const pool = new Pool(prodConfig)

