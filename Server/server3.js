const express = require("express");
const bodyParser = require("body-parser");
const OracleDB = require("oracledb");

const dbConfig={
  user:'arvindh',
  password:'arvindh',
  connectString:'localhost/ORCLPDB'
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send('hello world')
});

app.post('/insert',(req,res)=>{

  console.log('inside insert');
  res.send('inserted data');
})

app.listen(8080, function() {
  console.log("Server is running on 8080");
});
