// import necessary modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// set up server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // serve HTML file
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/pong.js') {
    // serve JavaScript file
    fs.readFile(path.join(__dirname, 'pong.js'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else {
    // serve static files
    const extension = path.extname(req.url);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    }[extension] || 'application/octet-stream';
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
});

// listen for incoming requests
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
