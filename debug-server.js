import { createServer } from 'http';

const server = createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

// Try different binding approaches
const PORT = 3005;

server.on('listening', () => {
  console.log(`Server is now listening on port ${PORT}`);
  console.log('Server address:', server.address());
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

console.log('Attempting to bind to port', PORT);

// Try binding to specific interface
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server bound to 127.0.0.1:${PORT}`);
});

// Also try binding to all interfaces
setTimeout(() => {
  console.log('Also attempting to bind to all interfaces...');
  const server2 = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World from all interfaces\n');
  });
  
  server2.listen(PORT + 1, '0.0.0.0', () => {
    console.log(`Server 2 bound to 0.0.0.0:${PORT + 1}`);
  });
  
  server2.on('error', (err) => {
    console.error('Server 2 error:', err);
  });
}, 1000);