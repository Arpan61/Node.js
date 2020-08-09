const http = require('http');
const fs = require('fs');

function doOnRequest(request, response) {
  // Send back a message saying "Welcome to Twitter"
  // code here...
  //response.end("Welcome to Twitter")
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    var page = fs.readFileSync('./index.html');
    response.end(page);

  }
  else if (request.method === 'GET' && request.url === '/style.css') {
    var page = fs.readFileSync('./style.css');
    response.end(page);
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    const msg = 'Somebody said hi.\n';
    fs.appendFileSync('hi_log.txt', msg);
    response.end("hi back to you!");
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    data = []
    request
      .on("data", chunk => {
        data.push(chunk);
      })
      .on("end", () => {
        data = data.toString();
        fs.appendFileSync('hi_log.txt', data + "\n");
        if (data === 'hello') {
          response.end("hello there!");
        }
        else if (data === `what's up`) {
          response.end(`the sky`);
        }
        else {
          response.end(`good morning`);
        }

      })



  }
  else {
    // Handle 404 error: page not found
    // code here...
    response.statusCode = 404;
    response.statusMessage = "Error: Not Found.";
    response.end();
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);
