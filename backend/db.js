const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hms_user',
  password: 'hms123',
  database: 'hms_db'
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

module.exports = db;