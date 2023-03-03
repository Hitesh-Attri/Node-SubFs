const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.static("folder")); 

app.get('/getData',(req,res)=>{
    let data = fs.readFileSync('./data.json','utf-8',);

    data = JSON.parse(data);

    let result = data.filter((d)=>{
        return d.name =="buntyy";
    });
    res.json(result);
});
// app.use(express.static("folder/subFolder")); // error here
// app.use(express.static(__dirname + "/public/subFolder")); error here

// E:\study\A1\A2\CQ\node\CQnodeAssignments\nodePracticeBunty\1

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html');
// });

// app.get('/home',(req,res)=>{
//     res.end("this is home end path");
// });

// app.get('/ch',(req,res)=>{
//     res.end("turning point?");
// });

// app.get('/script.js',(req,res)=>{
//     res.sendFile(__dirname + "/script.js");
// });

// // it will execute if endpoint is not defined
// app.get("/:universalURL", (req, res) => {
//     res.end("404 URL NOT FOUND");
// });

app.listen(port,(error)=>{
    if(error) console.log("some error occurd",error);
    else console.log("server running @port",port);
})