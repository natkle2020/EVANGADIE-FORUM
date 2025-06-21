import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const dbconfig = {
<<<<<<< HEAD
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '4000',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD  ,
    database: process.env.DB_NAME || 'evangadi_networks',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

}
=======
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
>>>>>>> befc4e45b87360b05a7c0825612566659a975f85

// Creating connection pool
const pool = mysql.createPool(dbconfig);

export default pool;
