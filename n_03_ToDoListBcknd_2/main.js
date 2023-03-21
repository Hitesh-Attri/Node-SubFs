var express = require('express');
var app = express();
const fs = require('fs');
var port = 3000;

//Request Parser 
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.static('public'));

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname +"/public/index.html");
// });

// app.get('/s5_2.js',(req,res)=>{
//     res.sendFile(__dirname +"/public/s5_2.js");
// });

// app.get('/style.css',(req,res)=>{
//     res.sendFile(__dirname +"/public/style.css");
// });

app.get('/getData',(req,res)=>{
    fs.readFile(__dirname+"/data.json","utf-8",(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else {
            theFile = JSON.parse(data);
        }
        res.json(theFile);
    });
});

app.post('/addData',(req,res)=>{
    fs.readFile(__dirname+"/data.json",'utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else{
            theFile = JSON.parse(data);
        }
        fs.writeFile(__dirname + "/data.json",JSON.stringify(req.body),(err)=>{
            if(!err) res.end();
            else res.end("error occured");
        });
    });
});

app.post('/pushObj',(req,res)=>{
    fs.readFile(__dirname+"/data.json",'utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else{
            theFile = JSON.parse(data);
        }
        theFile.push(req.body);
        fs.writeFile(__dirname + "/data.json",JSON.stringify(theFile),(err)=>{
            if(!err) res.end();
            else res.end("error occured");
        });
    });
});

app.listen(port,(error)=>{
    if(error) console.log("some error occured",error);
    else console.log("server running at ",port);
}); 