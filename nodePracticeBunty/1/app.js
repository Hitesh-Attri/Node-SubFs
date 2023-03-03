const http = require('http');

// Port numbers range from 0 to 65536,
// but only ports numbers 0 to 1024 are reserved for privileged services and designated as well-known ports.
// This list of well-known port numbers specifies the port used by the server process as its contact port.

const port = 3000;

const server = http.createServer(function(req,res){
    // inside this function we are going to handle all of the diff activities on our server
    //  so everytime someone request a page to our server, it is going to call this funtion right here and
    //  

    //  after "node app.js" "server is listing", but this doesnt do actually
    //  for that we need to implement this function


    //  returning some response to the user, for that we need to use the reb object, that is passed into this function

    // writing response to every single person that requests something for our server and
    // and we want to end our response saying that we have written everything we want to write we just type 
    res.write("helloo bunty's node");

    res.end();

    
});

// setup our server so it'll listen on the server that we want to so now that we have this server object wer can just
// call server.listen, pass it the port variable that we created to tell it to listen on port 3000 ans then this takes
// a single function that it'll call if there's an error potentially so as soon as our server starts listening it'll call this function
// and know to either pass an error or nothing if it was successful so we're gonna check to see if that error exists and
// so we're going to log out a message that something went wrng

server.listen(port, function(error){
    if(error){
        console.log("something went wrong", error);
    }
    else{
        console.log("sever is listening on port",port);
    }
});