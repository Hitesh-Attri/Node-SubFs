let express = require('express')
let app = express();
let fs = require('fs');
let port = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/script.js',(req,res)=>{
    res.sendFile(__dirname + '/script.js');
})

app.get('/getData',(req,res)=>{
    // res.sendFile(__dirname + '/script.js');
    fs.readFile(__dirname+'/data.txt','utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0) {
            theFile =[];
        }else{
            theFile = data;
            console.log(typeof data, data);
        }
        res.send(theFile);
    });
});


app.post('/addData',(req,res)=>{
    fs.readFile(__dirname+"/data.txt", "utf-8", (err,data)=>{
        let theFile;
        if(data.length === 0){
            theFile = [];
        }else{
            theFile = JSON.parse(data);
            console.log(theFile,typeof theFile,"else ")
        }

        console.log(theFile, typeof theFile,"1")
        console.log(req.body,typeof req.body,"2")
        // theFile = req.body;
        theFile = JSON.parse(req.body);
        console.log(theFile, typeof theFile,"3")
        
        fs.writeFile("./data.txt",JSON.stringify(theFile),(err)=>{
            if(!err) res.end();
            else res.end("error occured");
        });
    });
})

app.listen(port,(err)=>{
    if(err) console.log("some error occured",err);
    else console.log("server running at ",port);
});
