var mysql = require('mysql2');

let db = mysql.createConnection({
    host: "10.15.220.60",
    user: "iam",
    password: "fpt@123",
    database: "iam"
})
module.exports = db;