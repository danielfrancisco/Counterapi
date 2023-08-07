const express = require("express")
const PORT = 3000;
const cors = require("cors")
const bodyParser = require("body-parser")
require('dotenv').config()

const mysql = require('mysql2')
const con = mysql.createConnection(process.env.DATABASE_URL)

let data =""

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", async (req,res)=>{
  con.connect();
  con.query("SELECT * FROM home", function (err, result) {
    data=result
    res.send(data[0])
  });
  
  
  
})

app.post("/", async (req,res)=>{
    con.connect();
    var value = req.body.viewCounter
    var whereValue = "'Big things are coming!'"
    var sql = `UPDATE home SET counter = ${value} WHERE header = ${whereValue};`
    con.query(sql, function (err, result) {
    if (err) throw err;
    
  });
  res.end()
  
    
})

app.listen(PORT,function(){
    console.log("listening on port "+PORT)
})