const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: '1203',
  database: 'urlshortener'
});
module.exports = pool;