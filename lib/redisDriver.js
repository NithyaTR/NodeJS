var config = require('config');
var redis = require('redis');

var redisHost = config.redisHost;
var redisPort = config.redisPort;

var redisClient = redis.createClient(redisPort, redisHost);

redisClient.on('connect', function() {
    console.log('Connected to Redis');
});

// fetch driver ID from Redis based on city name.
module.exports.getDriverDetails = function (location, callback) {
    redisClient.get(location, function(err, response) {
        callback(response);
    });
}