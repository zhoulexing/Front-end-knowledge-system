const mysql = require("mysql");


//创建连接
const client = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mysql"
});

client.connect(function(err) {
  if(err) {
    console.log("err--->", err);
  }
});

client.query("select * from user", function(err, rows, field) {
  console.log("---->",err, rows, field);
});

client.end();

