// Simple server test script (ES Module)
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/test',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

req.end();