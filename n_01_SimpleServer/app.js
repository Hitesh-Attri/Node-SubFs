const http = require('http');

const port = 3000;

const server = http.createServer(function(req,res){
    res.write("helloo bunty's node");

    res.end();

});

server.listen(port, function(error){
    if(error){
        console.log("something went wrong", error);
    }
    else{
        console.log("sever is listening on port",port);
    }
});