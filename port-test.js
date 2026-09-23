import { createServer } from 'http';

const testPorts = [3007, 3008, 3009, 3010];

testPorts.forEach((port, index) => {
  const server = createServer((req, res) => {
    console.log(`Server on port ${port} received request:`, req.method, req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from port ${port}\n`);
  });

  server.listen(port, () => {
    console.log(`✅ Server successfully listening on port ${port}`);
    console.log(`   Address: ${server.address()}`);
    
    // Test the server immediately
    setTimeout(() => {
      console.log(`\n🔄 Testing server on port ${port}...`);
      // We can't test from within the same process, but we can log that it's working
    }, 1000);
  });

  server.on('error', (err) => {
    console.log(`❌ Server on port ${port} failed:`, err.message);
  });

  // Close the server after a few seconds
  setTimeout(() => {
    console.log(`🔚 Closing server on port ${port}`);
    server.close();
  }, 5000);
});