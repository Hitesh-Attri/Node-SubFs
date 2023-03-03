const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

app.get('/',(req,res) => {
    // res.send("me bunty, kese hoo");
    res.end("me bunty, kese hoo");
});

app.get("/page",(req,res) => {
    fs.readFile('./index.html','utf-8',(err,data)=>{
        if(err){
            res.end("some error occured in getting page");
        }
        else{
            res.end(data);
        }
    });
});

app.listen(port,(error)=>{
    if(error){
        console.log("some error occured", error);
    }
    else{
        console.log(`this is running @port:${port}`);
    }
})