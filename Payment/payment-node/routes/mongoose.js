var mongoose = require('mongoose');
mongoose.connect('localhost:27017/paymentData');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var userDataSchema = new Schema({
    fname           : String,
    lname           : String,
    email           : {type : String, unique: true},
    cardNum         : Number,
    cardType        : String,
    billingAddr     : String,
    shippingAddr    : String
});

//userDataSchema.plugin(passportLocalMongoose);;;

module.exports.PaymentData = mongoose.model('PaymentData', userDataSchema);

