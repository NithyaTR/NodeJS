var NodeGeocoder = require('node-geocoder');
var config = require('config');

var options = {
    provider: 'pickpoint',
    httpAdapter: 'https',
    apiKey: config.apiKey // get API key from pick point
  };
   
var geocoder = NodeGeocoder(options);

// fetch city name using latitude and longitude
module.exports.getLocation = function(location, callback) {
    var arr = location.split(':');
    geocoder.reverse({lat:parseInt(arr[0]), lon:parseInt(arr[1])}, function(err, res) {
        callback(res[0].city);
      });
}