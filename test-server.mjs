import http from 'http';
import { readFile } from 'fs';
import { join } from 'path';

const server = http.createServer((req, res) => {
  const filePath = join(import.meta.dirname, req.url === '/' ? 'index.html' : req.url);
  
  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(3007, () => {
  console.log('Server running on http://localhost:3007');
  console.log('Serving files from:', import.meta.dirname);
});