//const { json } = require('express');
var express = require('express');
var app = express();
const fs = require('fs');
var port = 4000;

//Request Parser 
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.static('images'));
const multer = require('multer');
// const upload = multer( { dest: 'images/'} )

// learn how these lines work!
// const upload = multer( {
//     storage:multer.diskStorage( {
//         destination:(req,res,cb)=>{
//             cb(null,"images")
//         },
//         // filename:(req,file,cb)=>{
//         //     cb(null,file.fieldname + "_" + Date.now() +'.jpg')
//         // }
//         filename:(req,file,cb)=>{
//             cb(null,file.originalname)
//         }
//     })
// }).single('taskImg');

const upload = multer( {
    dest:"images"
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/public/index.html");
});

app.get('/s5_2.js',(req,res)=>{
    res.sendFile(__dirname +"/public/s5_2.js");
});

app.get('/style.css',(req,res)=>{
    res.sendFile(__dirname +"/public/style.css");
});

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
    // console.log("here")
    fs.readFile(__dirname+"/data.json",'utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else{
            // console.log("here3");
            theFile = JSON.parse(data);
            // console.log(theFile,typeof theFile);
        }
        
        fs.writeFile(__dirname + "/data.json",JSON.stringify(req.body),(err)=>{
            // console.log(req.body, typeof req.body);
            // console.log("here2")
            if(!err) res.end();
            else res.end("error occured");
        });
    });
});

app.post('/uploadImg', upload.single('taskImg'), (req,res)=>{
    console.log("img here");
    // res.redirect('/');
    // res.json({ success: true });
    // console.log(req.file);
    // res.end();
    res.send(req.file);
});

// app.post('/deleteImg',(req,res)=>{
//     console.log(req.body,typeof req.body);
//     let name = JSON.parse(req.body);
//     console.log(name,typeof name);
//     // fs.unlink(__dirname + '/images' + , (err)=>{
//     //     if(err) {
//     //         console.log('err in delting', err);
//     //         res.send('error!')
//     //     }
//     //     else {
//     //         console.log("img dleted");
//             res.end();
//     //     }
//     // }); 
// });

app.post('/pushObj',(req,res)=>{
    // console.log(req.file);
    fs.readFile(__dirname+"/data.json",'utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else{
            theFile = JSON.parse(data);
        }
        theFile.push(req.body);

        // console.log(req.body, typeof req.body,"this is body");
        fs.writeFile(__dirname + "/data.json",JSON.stringify(theFile),(err)=>{
            if(!err) res.redirect('/');
            else res.end("error occured");
        });
    });
});

app.listen(port,(error)=>{
    if(error) console.log("some error occured",error);
    else console.log("server running at ",port);
}); 