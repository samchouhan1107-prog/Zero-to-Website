import express from 'express';
import path from 'path';

const app = express();
const PORT = 3004;

// Simple middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Simple route
app.get('/', (req, res) => {
  console.log('Root route called');
  res.send('Hello from simple Express server!');
});

app.get('/test', (req, res) => {
  console.log('Test route called');
  res.json({ message: 'Test successful', timestamp: new Date().toISOString() });
});

// Serve static files
app.use(express.static(path.join(process.cwd(), 'dist')));

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`Simple Express server running on http://localhost:${PORT}`);
  console.log(`Server address: ${server.address()}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

setTimeout(() => {
  console.log(`Server listening state: ${server.listening}`);
  console.log(`Server address: ${server.address()}`);
}, 2000);