const mysql = require('mysql2');

require('dotenv').config();

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements:true
});

dbConnection.connect((err) => {
    if (err) {
        console.log('Error connecting', err);
        return;
    }
    console.log('connected as id ' + dbConnection.threadId);
})

module.exports = {
    connection: dbConnection
};