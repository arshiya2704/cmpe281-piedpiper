var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/piedpiper');

mongoose.connect('mongodb://ip-10-1-2-163.us-west-1.compute.internal,ip-10-1-3-8.us-west-1.compute.internal/piedpiper?replicaSet=example-replica-set');
var Schema = mongoose.Schema;

var cardDataSchema = new Schema({
    cardNum : Number,
    cardType : String,
    cardName: String,
    expDate : Date
});

module.exports.CardData = mongoose.model('CardData', cardDataSchema);

