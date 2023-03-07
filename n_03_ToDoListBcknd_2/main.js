var express = require('express');
var app = express();
const fs = require('fs');
var port = 3000;

//Request Parser 
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).

app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/public/index.html");
});

app.get('/s5_2.js',(req,res)=>{
    res.sendFile(__dirname +"/public/s5_2.js");
});

app.get('/style.css',(req,res)=>{
    res.sendFile(__dirname +"/public/style.css");
});

// app.post('/addData',(req,res)=>{
//     fs.readFile(__dirname+"/data.txt",'utf-8',(err,data)=>{
//         let theFile;
//         console.log("m")
//         if(data.length === 0) theFile = [];
//         else{
//             console.log(typeof data, data);
//             theFile = JSON.parse(data);
//             console.log(typeof data, data);
//         }
//         theFile.push(req.body);

//         fs.writeFile("./data.txt",JSON.stringify(theFile),(err)=>{
//             if(!err) res.end();
//             else res.end("error occured");
//         });
//     })
// });


app.get('/getData',(req,res)=>{
    fs.readFile(__dirname+"/data.txt","utf-8",(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else {
            // console.log(typeof data,data, "before parse,get data main js");
            theFile = JSON.parse(data);
            // console.log(typeof data,data, "after parse,get data main js");
        }
        // console.log(theFile, typeof theFile,'node get')
        res.json(theFile);
    });
});

// app.post('/addTask',(req,res)=>{
//     // console.log(req.body, typeof req.body,"inside post");
//     fs.readFile(__dirname+"/data.txt", "utf-8", (err,data)=>{
//         let todos;
//         if(data.length === 0){
//             todos = [];
//         }else{
//             todos = JSON.parse(data);
//             // console.log(todos,typeof todos,"else ")
//         }
//         // todos.push(req.body);
//         // console.log(todos,"after push")
//         console.log(todos, typeof todos,"todos1")
//         console.log(req.body,typeof req.body,"req.body")
//         todos = req.body;
//         console.log(todos, typeof todos,"todos2")
        
//         fs.writeFile("./data.txt",JSON.stringify(todos),(err)=>{
//             if(!err) res.end();
//             else res.end("error occured");
//         });
//     });
// });

app.post('/addData',(req,res)=>{
    console.log("here")
    fs.readFile(__dirname+"/data.txt",'utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else{
            console.log("here3");
            // console.log(typeof data, data);
            theFile = JSON.parse(data);
            // console.log(typeof data, data);
            console.log(theFile,typeof theFile);
        }
        // theFile.push(req.body);
        // fs.writeFile("./data.txt",JSON.stringify(theFile),(err)=>{
            // console.log(__dirname,"56");
        fs.writeFile(__dirname + "/data.txt",JSON.stringify(req.body),(err)=>{
            console.log(req.body, typeof req.body);
            console.log("here2")
            if(!err) res.end();
            else res.end("error occured");
        });
    });
});

app.post('/pushObj',(req,res)=>{
    // console.log("here")
    fs.readFile(__dirname+"/data.txt",'utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else{
            // console.log("here3");
            // console.log(typeof data, data);
            theFile = JSON.parse(data);
            // console.log(typeof data, data);
            // console.log(theFile,typeof theFile);
        }
        theFile.push(req.body);
        console.log(req.body, typeof req.body);
        // fs.writeFile("./data.txt",JSON.stringify(theFile),(err)=>{
            // console.log(__dirname,"56");
        fs.writeFile(__dirname + "/data.txt",JSON.stringify(theFile),(err)=>{
            // console.log(req.body, typeof req.body);
            // console.log("here2")
            if(!err) res.end();
            else res.end("error occured");
        });
    });
});

// app.get('/getData',(req,res)=>{
//     fs.readFile(__dirname+"/data.txt", "utf-8", (err,data)=>{
//         let todos;
//         if(data.length === 0){
//             todos = [];
//         }else{
//             todos = JSON.parse(data);
//         }
//         console.log(typeof data,data,"get data");
//         console.log(typeof todos,todos,"get data");
//         res.json(todos);
//         // res.end(todos);
//     });
// });

app.listen(port,(error)=>{
    if(error) console.log("some error occured",error);
    else console.log("server running at ",port);
}); 