const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.get('/home',(req,res)=>{
    res.end("this is home end path");
});

app.get('/ch',(req,res)=>{
    res.end("turning point?");
});

app.get('/script.js',(req,res)=>{
    res.sendFile(__dirname + "/script.js");
});

// it will execute if endpoint is not defined
app.get("/:universalURL", (req, res) => {
    res.end("404 URL NOT FOUND");
});

app.listen(port,(error)=>{
    if(error) console.log("some error occurd",error);
    else console.log("server running @port",port);
})