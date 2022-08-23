const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(express.json());
app.use(cors());

//database connection

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "aiman09#",
  database: "students",
});

//post request

app.post("/create", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const fatherName = req.body.fatherName;
  const CNIC = req.body.CNIC;
  const contact = req.body.contact;
  const gender = req.body.gender;

  db.query(
    "INSERT INTO studentinfo (firstName, lastName, fatherName, CNIC, contact, gender) VALUES (?,?,?,?,?,?)",
    [firstName, lastName, fatherName, CNIC, contact, gender],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Post request!");
        res.send("success");
      }
    }
  );
});

// //get request

app.get("/get", (req, res) => {
  db.query("SELECT * FROM studentinfo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Get Request!");
      res.send(result);
    }
  });
});

// // update

app.put("/update", (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const fatherName = req.body.fatherName;
  const CNIC = req.body.CNIC;
  const contact = req.body.contact;
  const gender = req.body.gender;

  db.query(
    "UPDATE studentinfo SET firstName = ?, lastName = ?, fatherName = ?, CNIC = ?, contact = ?, gender = ? WHERE ID = ?",
    [firstName, lastName, fatherName, CNIC, contact, gender, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Update Request!");
        res.send(result);
      }
    }
  );
});

// // delete

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE from studentinfo WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete request");
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
