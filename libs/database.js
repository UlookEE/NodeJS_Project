const mysql = require('mysql2/promise');

const pool = mysql.createPool(
    require('./../config/database')
);

module.exports = pool;