const http = require('http');
const fs = require('fs');
const path = require('path');
// const open = require('opn')
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Set the content type based on the file extension
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
  }

  // If the requested file is not found, serve a 404 response
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal server error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(3000, 'localhost', () => {
  const url = `http://localhost:3000/`
    console.log(`Server running at ${url}`);
    // open(`http://localhost:3000/`);
  exec(`xdg-open ${url}`);
});
