var app = require('express')();
var config = require('config');
var redisDriver = require('./lib/redisDriver.js');
var mongoDriver = require('./lib/mongoDriver.js');
var locator = require('./lib/locator.js');

var appPort = config.appPort;

/*
Using client's geolocation (latitude,longitude), find the city. 
Redis cache has list of drivers' ID in that city.
Using ID from cache, fetch driver details and return as response.
NOTE : path param location is of the format latitude:longitude
*/
app.get('/getCabs/:location', function(req, res) {
    locator.getLocation(req.params.location, function(data) {
        redisDriver.getDriverDetails(data, function(id) {
            mongoDriver.getDriverDetails(id, function(data) {
                res.send(data);
            });
        });
    });
});

app.listen(appPort, function() {
    console.log("Server is listening on port " + appPort);
})