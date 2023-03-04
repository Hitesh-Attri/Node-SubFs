var express = require('express');
var app = express();
const fs = require('fs');
var port = 3000;

//Request Parser 
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).

app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/public/index.html");
});

app.get('/s5.js',(req,res)=>{
    res.sendFile(__dirname +"/public/s5.js");
});

app.get('/style.css',(req,res)=>{
    res.sendFile(__dirname +"/public/style.css");
});

app.post('/addTask',(req,res)=>{
    console.log(req.body, typeof req.body,"inside post");
    fs.readFile(__dirname+"/data.txt", "utf-8", (err,data)=>{
        let todos;
        if(data.length === 0){
            todos = [];
        }else{
            todos = JSON.parse(data);
        }
        todos.push(req.body);
        fs.writeFile("./data.txt",JSON.stringify(todos),(err)=>{
            if(!err) res.end();
            else res.end("error occured");
        });
    });
});

app.get('/getData',(req,res)=>{
    fs.readFile(__dirname+"/data.txt", "utf-8", (err,data)=>{
        let todos;
        if(data.length === 0){
            todos = [];
        }else{
            todos = JSON.parse(data);
        }
        console.log(typeof data,data,"get data");
        res.json(todos);
    });
});

app.listen(port,(error)=>{
    if(error) console.log("some error occured",error);
    else console.log("server running at ",port);
});