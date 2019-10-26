/*
    Primary file for the API
    command - node index.js
    command - curl localhost:3000 - ???
*/

// Dependencies 
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');

// Instantiating the HTTP server
const httpServer = http.createServer(function(req,res){
    unifiedServer(req,res);
});

// Start the server
httpServer.listen(config.httpPort, function(){
    console.log('The servers listening on port '+config.httpPort);
});
// Instantiate HTTPS server 
let httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpsServerOptions,function(req,res){
    unifiedServer(req,res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function(){
    console.log('The servers listening on port '+config.httpsPort);
});

// All the server logic for both the http and https createServer
let unifiedServer = function(req,res) {
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


        // Choose the handler this request should go to. If one isn`t found, use the notFound handler.
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        
        //Construct the data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode,payload){
            // Use the status code callback by the handler or default to 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            // Use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert the payload to a string
            let payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);    

        // Log the request path
        console.log('Returning this response',statusCode, payloadString);
        });
        
        // Send the response 
        
        // command 'node index.js' in node shell and 'curl localhost:3000/foo' in cmd shell 
        // command 'curl localhost:3000/foo/bar/'
    });
}
// Define the handlers 
let handlers = {

};
// Sample handler 
handlers.sample = function(data,callback){
    //callback a http status code and a payload object
    callback(406,{'name': 'sample handler'})
};

// Not found handler 
handlers.notFound = function(data,callback) {
    callback(404);
};

// Define a request router
let router = {
    'sample': handlers.sample
};


// gitbash-command for SSL 'openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem'