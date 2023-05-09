const mysql = require('mysql2');

const db = mysql.createConnection(
   { host: 'localhost',
    user: 'root',

    password: 'prinserver',
    database: 'company_db'
});

console.log(`Connected to the company_db database.`)

db.connect(err => {
    if (err) throw err
}) 
module.exports = db