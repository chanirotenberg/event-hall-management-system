import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' }); // או איפה שהקובץ יושב בפועל
console.log("DB ENV:", process.env.MYSQL_HOST, process.env.MYSQL_USER, Boolean(process.env.MYSQL_PASSWORD));

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// פונקציה שמחזירה את החיבור
const getDb = () => pool;

export default getDb;
