/*
    Primary file for the API
    command - node index.js
    command - curl localhost:3000 - ???
*/

// Dependencies 
const http = require('http');

// The server should respond to all requests with a string 
const server = http.createServer(function(req,res){
    res.end('Hello world\n');
});

// Start the server and have it losten on port 3000 
server.listen(3000, function(){
    console.log('The servers listening on port 3000 now');
});
