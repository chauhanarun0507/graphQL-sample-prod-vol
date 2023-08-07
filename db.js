const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'graphql_sample',
    connectionLimit: 10, // Set an appropriate connection limit based on your requirements.
});

pool.query = util.promisify(pool.query)

module.exports = {
    pool
}