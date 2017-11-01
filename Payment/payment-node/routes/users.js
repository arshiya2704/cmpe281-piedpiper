var express = require('express');
var router = express.Router();
var mongoose = require('./mongoose');

/* GET users listing. */
router.post('/api/checkout', function (req, res) {
    console.log('checkout is being called');
    console.log(req.body);
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var cardNum = req.body.cardNum;
    var cardType = req.body.cardType;
    var billingAddr = req.body.billingAddr;
    var shippingAddr = req.body.shippingAddr;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(cardNum);
    console.log(cardType);
    console.log(billingAddr);
    console.log(shippingAddr);
    var newUser = mongoose.PaymentData();
    newUser.fname = fname;
    newUser.lname = lname;
    newUser.email = email;
    newUser.cardNum = cardNum;
    newUser.cardType = cardType;
    newUser.billingAddr = billingAddr;
    newUser.shippingAddr = shippingAddr;

    newUser.save(function (err, savedUser) {
        if(err)
        {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send({message:"User Registered!!"})
    });

});

module.exports = router;
