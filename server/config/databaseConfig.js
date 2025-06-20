import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const dbconfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Creating connection pool
const pool = mysql.createPool(dbconfig);

export default pool;
