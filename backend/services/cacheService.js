const { createClient } = require('redis');

// Connect to localhost Redis
const client = createClient({
  url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.log('❌ Redis Client Error', err));

client.connect();

exports.set = (key, value) => client.set(key, value);
exports.get = (key) => client.get(key);
