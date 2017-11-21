var express = require('express');
var router = express.Router();
var mongoose = require('./mongoose');
//var send = require('./send');
var http = require('http');
var querystring = require('querystring');
var request     = require('request');

// var $ = require('jquery');
// var jsdom = require('jsdom');
// const { JSDOM } = jsdom;
//
// const { document } = (new JSDOM('')).window;
// global.document = document;




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
    var expM = req.body.expM;
    var expY = req.body.expY;
    var expDate = expM + "/" + expY;
    console.log(expDate);
    var newCard = mongoose.CardData();
    newCard.cardNum = cardNum;
    newCard.cardName = cardName;
    newCard.cardType = cardType;
    newCard.expDate = expDate;
    if(cardNum && cardName && cardType && expM && expY){
        newCard.save(function (err, savedUser) {
            if(err)
            {
                console.log(err);
                return res.status(502).send({message:"Card already exists!!"});
            }
            else
            return res.send({status:200, message:"Card saved successfully!!"})
        });
    }
    else
        return res.status(500).send({message:"Enter card number properly!!"})
});

router.get('/api/get', function (req, res) {
    console.log('get is being called');
    mongoose.CardData.find({}, function (err,user,info) {
        if(err){
            console.log(err);
        }
        else{
            console.log(user);
            return res.status(200).send(user);
        }
    })

});

router.post('/api/checkout', function (req, res) {
    console.log('checkout is being called');
    console.log(req.body);
    //  var userId= req.body.userId;
    //  var qty = req.body.qty;
    //  var itemId= req.body.itemId;
    //  var total = req.body.total;
    //  // send.deduct({qty:,});
    //
    //  //var data= {arr : req.body};
    //  var resArr=[];
    //  for(i=2;i< ((req.body).length);i++){
    //      var data=[];
    //      data[i] = querystring.stringify({
    //          qty: req.body[i].qty,
    //          itemId :req.body[i].itemId
    //      });
    //      // data.qty =req.body[i].qty;
    //      // data.itemId = req.body[i].itemId;
    //      resArr.push(data[i]);
    //  }
    //  console.log("resArr is");
    //  console.log(resArr);
    //  var dataSend = resArr.toString();
    // console.log("datasend:"+dataSend);

    // data= {data:req.body};
    // //dataType: 'json',
    // var options = {
    //     host: 'localhost',
    //     port: 3002,
    //     path: '/users/deduct',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         //'Content-Length': Buffer.byteLength(dataSend)
    //         'dataType': 'json'
    //
    //     }
    // };
    //
    // var httpreq = http.request(options, function (response) {
    //     response.setEncoding('utf8');
    //     response.on('dataSend', function (chunk) {
    //         console.log("body: " + chunk);
    //     });
    //     response.on('end', function() {
    //         res.send('ok');
    //     })
    // });
    // httpreq.write(data);
    // httpreq.end();
    // if(userId && qty && itemId && total)
    // {
    //     console.log(userId);
    //     //console.log(qty);
    //     console.log(itemId);
    //     console.log(total);


    // $.ajax({
    //     type: 'POST',
    //     url: 'localhost:3002/users/deduct',
    //     crossDomain: true,
    //     data: {data:req.body},
    //     dataType: 'json',
    //     contentType: "application/x-www-form-urlencoded",
    //     success: function () {
    //
    //     }
    //
    // });

    request.post({
        url: "http://localhost:3002/users/deduct",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Accept-Encoding':'gzip, deflate',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept':'application/json, text/plain, */*',
            'User-Agent': 'UserAgent'
        },
        json: true,
        body: req.body
    }, function(err, res, body){

        //whatever
    });

    //console.log((req.body).isEmptyObject());

    if(!(JSON.stringify(req.body) === '{}')){
        return res.status(200).send({message:"Order has been placed"});
    }
    else
        return res.status(500).send({message:"Issue with the order"});
});



module.exports = router;
