const mysql = require('mysql2/promise');
require('dotenv').config();

let connection;

async function getConnection() {
  if (connection) return connection;
  connection = await mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
  });
  console.log('✅ Connected to MySQL');
  return connection;
}

module.exports = getConnection;
