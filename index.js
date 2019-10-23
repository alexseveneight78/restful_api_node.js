/*
    Primary file for the API
    command - node index.js
    command - curl localhost:3000 - ???
*/

// Dependencies 
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string 
const server = http.createServer(function(req,res){

    // Get the URL and parse it
    let parsedUrl = url.parse(req.url, true);

    // Get the path 
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the query string as an object --- command 'curl localhost:3000/foo?fizz=buzz
    let queryStringObject = parsedUrl.query;

    // Get the HTTP method
    let method = req.method.toLowerCase();

    // Get the headers as an object - work with postman
     headers = req.headers;

    // Get the payload, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();

        // Send the response 
        res.end('Hello world\n');    
        
        // Log the request path
        console.log('Request received with this payload',buffer);
        // command 'node index.js' in node shell and 'curl localhost:3000/foo' in cmd shell 
        // command 'curl localhost:3000/foo/bar/'
    });
});

// Start the server and have it losten on port 3000 
server.listen(3000, function(){
    console.log('The servers listening on port 3000 now');
});
