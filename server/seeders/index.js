var mysql = require("mysql");
const parent = require("../Parent.json");
const child = require("../Child.json");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

// Configure MySQL connection
var connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
});

//Establish MySQL connection
connection.connect(function (err) {
  if (err) throw err;
  else {
    console.log("CONNECTED");
    console.log("inserting parent data");
    console.log(parent);

    var values = [];
    for (var i = 0; i < parent.data.length; i++)
      values.push([
        parent.data[i].id,
        parent.data[i].sender,
        parent.data[i].receiver,
        parent.data[i].totalAmount,
      ]);
    console.log("VAlues", values);
  }
  connection.query(
    "INSERT INTO parents(id,sender,receiver,totalAmount) VALUES ?",
    [values],
    function (err, result) {
      if (err) {
        throw err;
      }

      console.log("Parents data inserted");
      console.log("Now inserting child data");
      values = [];
      for (var i = 0; i < child.data.length; i++)
        values.push([
          child.data[i].id,
          child.data[i].parentId,
          child.data[i].paidAmount,
        ]);
      connection.query(
        "INSERT INTO children(id,parentId,paidAmount) VALUES ?",
        [values],
        function (err, result) {
          if (err) {
            throw err;
          }

          console.log("Child data inserted");
          connection.end();
        }
      );
    }
  );
});
