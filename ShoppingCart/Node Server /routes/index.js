var express = require('express');
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/cmpe281";
 
router.get('/items', function (req, res, next) {

    try{
        mongo.connect(mongoURL, function(db){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = db.collection('items');

            coll.find({}).toArray(function(err, items){
                if (items) {
                    console.log(items);
                    res.status(201).send(items);
                } else {
                    console.log("fail");
                    res.status(202).send({"message":"Failed"});
                }
            });
        });
    }
    catch (e){
        console.log("error");
    }
  
});

router.get('/getCartItems', function (req, res, next) {
    
        try{
            mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var cartid = req.body.cartid;
        
            var coll = db.collection('cartitems');
    
                coll.find({cartid}).toArray(function(err, items){
                    if (items) {
                        console.log(items);
                        res.status(201).send(items);
                    } else {
                        console.log("fail");
                        res.status(202).send({"message":"Failed"});
                    }
                });
            });
        }
        catch (e){
            console.log("error");
        }
      
});

router.get('/createCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var groupid = req.body.groupid;
            var coll = db.collection('cart');

            coll.insert({
                groupid,
                status:"active",

            },(err,insertedItem)=>{
                res.status.send(insertedItem);
            });
        });    
    }
    catch (e){
        console.log("error");
    } 
});

router.get('/addToCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var cartid = req.body.cartid;
            var itemid = req.body.itemid;
            var coll = db.collection('cartitems');

            coll.findOne({cartid,itemid,status:"active"},(err,item)=>{
                if(item){
                    coll.update(
                        {cartid,itemid},
                        {$set: {quantity:item.quantity+1}}
                    );
                }
                else{
                    coll.insert({
                        cartid,
                        itemid,
                        quantity:1
                    });
                }
            });

            
        });    
    }
    catch (e){
        console.log("error");
    } 
});



router.get('/removeFromCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var cartid = req.body.cartid;
            var itemid = req.body.itemid;
            var coll = db.collection('cartitems');

            coll.findOne({cartid,itemid},(err,item)=>{
                if(item.quantity >1){
                    coll.update(
                        {cartid,itemid},
                        {$set: {quantity:item.quantity-1}}
                    );
                }
                else{
                    coll.remove({cartid,itemid});
                }
            });
        });    
    }
    catch (e){
        console.log("error");
    } 
});

module.exports = router;
