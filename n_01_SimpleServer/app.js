const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer(function(req,res){
    // let 
    // res.write("helloo bunty's node");
    // res.writeHead(200, {'Content-Type' : 'text/HTML'});
    // fs.readFile('index.html',(error,data)=>{
    //     if(error){
    //         res.writeHead(404);
    //         res.write("some error occures",error);
    //     }else{
    //         res.write(data);
    //     }
    //     res.end();
    // });

    let url = req.url;
    let method = req.method;

    if(url === "/" && method === "GET"){
        res.end("Home page");
    }
    else if(url === "/delhi" && method === "GET"){
        res.end("punjabi bagh");
    }
    else if(url ==="/Ch" && method === "GET"){
        res.end("greater good ?");
    }else{
        res.end("ss");
    }
    console.log(url,method);
    // res.end();
});

server.listen(port, function(error){
    if(error){
        console.log("something went wrong", error);
    }
    else{
        console.log("sever is listening on port",port);
    }
});