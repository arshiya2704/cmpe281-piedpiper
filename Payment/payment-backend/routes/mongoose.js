var mongoose = require('mongoose');
mongoose.connect('localhost:27017/piedpiper');
var Schema = mongoose.Schema;

var cardDataSchema = new Schema({
    cardNum : Number,
    cardType : String,
    cardName: String,
    expDate : Date
});

module.exports.CardData = mongoose.model('CardData', cardDataSchema);

