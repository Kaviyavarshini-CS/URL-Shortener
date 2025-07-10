const { createClient } = require('redis');
const client = createClient({ url: 'redis://redis:6379' });
client.connect();

exports.set = (key, value) => client.set(key, value);
exports.get = (key) => client.get(key);
