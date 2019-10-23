/*
    Primary file for the API
    command - node index.js
    command - curl localhost:3000 - ???
*/

// Dependencies 
const http = require('http');
const url = require('url');

// The server should respond to all requests with a string 
const server = http.createServer(function(req,res){

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path 
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the query string as an object --- command 'curl localhost:3000/foo?fizz=buzz
    const queryStringObject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Send the response 
    res.end('Hello world\n');    
    
    // Log the request path
    console.log('Request is received on path: ' + trimmedPath + 'with method: ' + method + ' and with these query string parameters', queryStringObject);
    // command 'node index.js' in node shell and 'curl localhost:3000/foo' in cmd shell 
    // command 'curl localhost:3000/foo/bar/'
});

// Start the server and have it losten on port 3000 
server.listen(3000, function(){
    console.log('The servers listening on port 3000 now');
});
