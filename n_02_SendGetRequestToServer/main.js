
var express = require('express');
var app = express();
const fs = require('fs');
const { type } = require('os');
var port = 3000;

//Request Parser 
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).


app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/index.html");
});
var i = 0;
app.get('/getData',(req,res)=>{
    // res.send("here" + i++);
    let data = fs.readFileSync('./data.json','utf-8',);

    // data = JSON.parse(data);
    console.log(typeof data);
    res.send(data);
    
});

app.listen(port,(error)=>{
    // if(error) res.end("some error occured",error);
    // else res.end("server running at ");

    if(error) console.log("some error occured",error);
    else console.log("server running at ",port);
});