const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  port: process.env.SQLPORT,
  password: process.env.SQLPASSWORD,
  database: process.env.SQLDATABASE,
});

module.exports = db;
