// Create web server
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');
// 2. Create the server
http.createServer(function (request, response) {
  var urlObj = url.parse(request.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    pathname = 'index.html';
  }
  var filePath = path.join(__dirname, pathname);
  if (filePath.indexOf('loadData') !== -1) {
    var data = comments.get();
    response.end(JSON.stringify(data));
  } else {
    fs.readFile(filePath, 'utf-8', function (err, data) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/html'
        });
        response.end('<h1>404 Not Found</h1>');
      } else {
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        response.end(data);
      }
    });
  }
}).listen(3000, function () {
  console.log('Server running at http://localhost:3000/');
});
// 3. Listen to the port