const express = require("express"),
  bodyParser = require("body-parser"),
  mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "hosteltest",
});

//Get data from table (students) by national
app.get("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    connection.query("SELECT * FROM students", (err, rows) => {
      connection.release(); // return the connection pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

//Listen on environment port or 5000
app.listen(port, () => console.log(`Listen om port ${port}`));
