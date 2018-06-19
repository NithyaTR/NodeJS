var config = require('config');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect(config.mongodb)
        .then(() => console.log('Mongoose connection open to ' + config.mongodb))
        .catch((err) => console.log('Error while connecting to mongodb ' + err));

var driverSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    cabDetails: String
})

var driverModel = mongoose.model('driverdetails', driverSchema);

// fetch driver details from mongoDB
module.exports.getDriverDetails = function(id, callback) {
    driverModel.findById(id)
    .exec(
        function (err,data) {
            if(err) console.log(err);
            callback(data);
        }
    )
}