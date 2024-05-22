const Redis = require('ioredis');

const redis = new Redis();

// app.set('views', path.join(__dirname, 'views'));

exports.clint = redis;
