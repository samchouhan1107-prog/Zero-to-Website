import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(3003, () => {
  console.log('HTTP server running on http://localhost:3003');
  console.log('Server address:', server.address());
});