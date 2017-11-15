var express = require('express');
var router = express.Router();
var mongoose = require('./mongoose');
var send = require('./send');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/save', function (req, res) {
    console.log('save is being called');
    console.log(req.body);
    var cardNum = req.body.cardNum;
    var cardName = req.body.cardName;
    var cardType = req.body.cardType;
    var expDate = req.body.expDate;
    var newCard = mongoose.CardData();
    newCard.cardNum = cardNum;
    newCard.cardName = cardName;
    newCard.cardType = cardType;
    newCard.expDate = expDate;
    newCard.save(function (err, savedUser) {
        if(err)
        {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send({message:"Card saved successfully!!"})
    });
});

router.post('/api/checkout', function (req, res) {
    console.log('checkout is being called');
    console.log(req.body);
    var userId= req.userId;
    var qty = req.qty;
    var itemId= req.itemId;
    var total = req.total;
    send.deduct({});
    if(userId && qty && itemId && total)
    {
        console.log(userId);
        console.log(qty);
        console.log(itemId);
        console.log(total);
        return res.status(200).send({message:"Order has been placed"});
    }
    else
        return res.status(500).send({message:"Issue with the order"});
});

module.exports = router;
