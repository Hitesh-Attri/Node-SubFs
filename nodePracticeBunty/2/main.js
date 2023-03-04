var express = require('express');
var app = express();
const fs = require('fs');
var port = 3000;

//Request Parser 
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).

app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/index.html");
});

app.get('/script.js',(req,res)=>{
    res.sendFile(__dirname +"/script.js");
});

app.post('/addData',(req,res)=>{
    fs.readFile(__dirname+"/data.txt",'utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else{
            console.log(typeof data, data);
            theFile = JSON.parse(data);
            console.log(typeof data, data);
        }
        theFile.push(req.body);

        fs.writeFile("./data.txt",JSON.stringify(theFile),(err)=>{
            if(!err) res.end();
            else res.end("error occured");
        });
    })
});

app.get('/getData',(req,res)=>{
    fs.readFile(__dirname+"/data.txt","utf-8",(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else {
            console.log(typeof data,data, "before parse,get data main js");
            theFile = JSON.parse(data);
            console.log(typeof data,data, "after parse,get data main js");
        }
        res.json(theFile);
    });
});

app.listen(port,(error)=>{
    if(error) console.log("some error occured",error);
    else console.log("server running at ",port);
});