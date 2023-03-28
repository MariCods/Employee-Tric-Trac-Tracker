const express = require('express');
const mysql = require('mysq12');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
   { host: 'localhost',
    user: 'root',

    password: '',
    database: 'company_db'
},

console.log(`Connected to the courses_db database.`)
);



// Query database
db.query('SELECT * FROM course_names', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
