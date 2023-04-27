const mysql = require('mysql2');

const db = mysql.createConnection(
   { host: 'localhost',
    user: 'root',

    password: 'prinserver',
    database: 'company_db'
});

console.log(`Connected to the company_db database.`)


db.query('SELECT * FROM departments, SELECT * FROM employees', function (err, results){
    console.log(results)
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
db.connect(err => {
    if (err) throw err
}) 
module.exports = db