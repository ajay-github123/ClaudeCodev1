// Serves index.html on localhost, wrapped in the same document skeleton the
// published artifact gets, so the local copy and the shared link behave alike.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const page = () => fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

http.createServer((req, res) => {
  if (req.url !== '/' && req.url !== '/index.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
    '<style>body{margin:0}[hidden]{display:none!important}</style></head><body>' +
    page() + '</body></html>');
}).listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
