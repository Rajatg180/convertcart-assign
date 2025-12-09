import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.DB_HOST || process.env.MYSQLHOST;
const user = process.env.DB_USER || process.env.MYSQLUSER;
const password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD;
const database = process.env.DB_NAME || process.env.MYSQLDATABASE;
const port = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);

const sslRequired =
  (process.env.DB_SSL_MODE || process.env.MYSQL_SSL_MODE || "").toUpperCase() === "REQUIRED" ||
  (process.env.DB_HOST || "").includes("aivencloud.com") ||
  (process.env.MYSQLHOST || "").includes("aivencloud.com");

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  port,

  ...(sslRequired ? { ssl: { rejectUnauthorized: false } } : {}),

  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
