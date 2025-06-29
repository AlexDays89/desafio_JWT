import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { DATABASE_USER, DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT } = process.env;

const pool = new pg.Pool({  
    user: DATABASE_USER,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
    allowExitOnIdle: true    
});

//jwt
const jwtSecret = process.env.JWT_SECRET;

export default pool;
export { jwtSecret };
