// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

let connection;

async function getConnection() {
  if (connection) return connection; // reuse connection
  connection = await mysql.createConnection({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'BlogDB',
    port: process.env.MYSQLPORT || 3306,
  });
  console.log('✅ Connected to MySQL');
  return connection;
}

module.exports = getConnection;
