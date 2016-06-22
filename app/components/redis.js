const redis = require('redis'),
    bluebird = require('bluebird');

var client = redis.createClient({
    prefix: 'sm.'
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = client;
