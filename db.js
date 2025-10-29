// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

let connection;

async function getConnection() {
  if (connection) return connection; // reuse existing connection

  connection = await mysql.createConnection({
    host: process.env.MYSQLHOST,       // containers-us-west-xxx.railway.app
    user: process.env.MYSQLUSER,       // railway_user
    password: process.env.MYSQLPASSWORD,// railway_password
    database: process.env.MYSQLDATABASE,// railway_db
    port: process.env.MYSQLPORT,        // 5432
  });

  console.log('✅ Connected to MySQL');
  return connection;
}

module.exports = getConnection;
