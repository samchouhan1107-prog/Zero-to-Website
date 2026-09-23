import net from 'net';

const client = net.createConnection({ port: 3003 }, () => {
  console.log('Connected to server!');
  client.write('GET / HTTP/1.1\r\n\r\n');
});

client.on('data', (data) => {
  console.log('Received data:', data.toString());
  client.end();
});

client.on('error', (err) => {
  console.error('Connection error:', err.message);
});

client.on('end', () => {
  console.log('Connection ended');
});