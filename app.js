const express = require("express"); 
const bodyParser = require("body-parser") 
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'sales'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// New app using express module 
const app = express(); 
app.use(bodyParser.urlencoded({ 
	extended:true
})); 

app.get("/", function(req, res) { 
    console.log('---');
    // con.query('SELECT * FROM users where name="ashok"', (err, rows, fields) => {
    //     if (!err)
    //       res.send(rows);
    //     else
    //     console.log(err);
    //     })
res.sendFile(__dirname + "/index.html"); 
}); 

app.post("/purcase", function(req, res) { 
    console.log(req.body);
    var wh_purcase = '';
    var from_date = req.body.from_date;
    var to_date = req.body.to_date;
    var cash_type = (req.body.cash_type) ? req.body.cash_type : '';
    if(from_date){
        wh_purcase = ' DATE(bill_date) >= "'+from_date+'"';
    } 
    if(to_date){
        wh_purcase += (wh_purcase) ? ' AND ': '';
        wh_purcase += ' DATE(bill_date) <= "'+to_date+'"';
    }
    if(cash_type){
        wh_purcase += (wh_purcase) ? ' AND ': '';
        wh_purcase += ' bill_type IN ("'+cash_type+'")';
    }
    if(wh_purcase){
        wh_purcase = ' where '+wh_purcase;
    }
    con.query('SELECT * FROM purchase '+wh_purcase, (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
    console.log(err);
    }) 
}); 

app.post("/sales", function(req, res) { 
    console.log(req.body);
    var wh_purcase = '';
    var from_date = req.body.from_date;
    var to_date = req.body.to_date;
    var cash_type = (req.body.cash_type) ? req.body.cash_type : '';
    if(from_date){
        wh_purcase = ' DATE(bill_date) >= "'+from_date+'"';
    } 
    if(to_date){
        wh_purcase += (wh_purcase) ? ' AND ': '';
        wh_purcase += ' DATE(bill_date) <= "'+to_date+'"';
    }
    if(cash_type){
        wh_purcase += (wh_purcase) ? ' AND ': '';
        wh_purcase += ' bill_type IN ("'+cash_type+'")';
    }
    if(wh_purcase){
        wh_purcase = ' where '+wh_purcase;
    }
    con.query('SELECT * FROM purchase '+wh_purcase, (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
    console.log(err);
    }) 
}); 

app.listen(3000, function(){ 
console.log("server is running on port 3000"); 
}) 
