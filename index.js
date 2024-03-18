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
  password: "root",
  database: "hosteltest",
});

//Get all records from table (students)
app.get("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    connection.query("SELECT * FROM students ", (err, rows) => {
      connection.release(); // return the connection pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});
//Get record from table (students) by id
app.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    connection.query(
      "SELECT * FROM students WHERE id = ? ",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection pool

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});
//Get record from table (students) by nationa_id
app.get("/:national_id_number", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    connection.query(
      "SELECT * FROM students WHERE national_id_number = ? ",
      [req.params.national_id_number],
      (err, rows) => {
        connection.release(); // return the connection pool

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

//Delete record from table (students) by id
app.delete("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    connection.query(
      "DELETE from students WHERE id = ? ",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection pool

        if (!err) {
          res.send(
            `Student with the record ID: ${[req.params.id]} has been removed. `
          );
        } else {
          console.log(err);
        }
      }
    );
  });
});

//Add record in the table (students)
app.post("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    const params = req.body;

    connection.query("INSERT INTO students SET ? ", [params], (err, rows) => {
      connection.release(); // return the connection pool

      if (!err) {
        res.send(`Student with the name: ${[params.name]} has been added. `);
      } else {
        console.log(err);
      }
    });
    console.log(req.body);
  });
});

//Update record in the table (students)
app.put("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    const {
      id,
      name,
      email,
      national_id_number,
      university_name,
      admission_number,
    } = req.body;

    connection.query(
      "UPDATE  students SET name = ? WHERE id = ? ",
      [name, id],
      (err, rows) => {
        connection.release(); // return the connection pool

        if (!err) {
          res.send(`Student with the name: ${name} has been updated. `);
        } else {
          console.log(err);
        }
      }
    );
    console.log(req.body);
  });
});

//Listen on environment port or 5000
app.listen(port, () => console.log(`Listen om port ${port}`));
