var express = require('express');
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/cmpe281";
 

router.get('/getPersonalCartItems', function (req, res, next) {
    
        try{
            mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var m = req.body.userId;

            var coll = db.collection('personalcartitems');
    
                coll.find({userId}).toArray(function(err, items){
                    if (items) {
                        console.log(items);
                        res.status(201).send(items);
                    } else {
                        res.status(202).send({});
                    }
                });
            });
        }
        catch (e){
            console.log("error");
        }
      
});

router.get('/getGroupCartItems', function (req, res, next) {
    
        try{
            mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
        
            var groupId = req.body.groupId;
        
            var coll = db.collection('groupcartitems');
    
                coll.find({groupId}).toArray(function(err, items){
                    if (items) {
                        console.log(items);
                        res.status(201).send(items);
                    } else {
                        res.status(202).send({});
                    }
                });
            });
        }
        catch (e){
            console.log("error");
        }
      
});


router.post('/addToPersonalCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var reqitem = req.body.item;
            var userId = req.body.userId;
            console.log("req body", userId);

            var coll = db.collection('personalcartitems');

            coll.findOne({userId},(err,cart)=>{

                if(cart){
                    coll.find({userId,"items.itemId":reqitem.itemId},(err,item)=>{

                        if(item){
                            coll.update(
                                {   
                                    userId,"items.itemId":item.itemId 
                                },
                                {
                                    "$inc":{"items.$.qty": 1
                                }
                            });
                        }
                        else{
                            coll.update(
                                { userId },
                                {
                                  $push: {
                                    items: 
                                    { 
                                        itemId:reqitem.itemId,itemName:reqitem.itemName,quantity:1
                                    }
                                  }
                                }
                             );     
                        }
                        
                    });
                }
                else{
                    coll.insert({
                        userId,
                        "items":[{itemId:reqitem.itemId,itemName:reqitem.itemName,quantity:1}],
                    });
                }

            });

            
        });    
    }
    catch (e){
        console.log("error");
    } 
});

router.post('/addToGroupCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var reqitem = req.body.item;
            var groupId = req.body.groupId;
            var coll = db.collection('groupcartitems');

            coll.findOne({groupId},(err,cart)=>{

                if(cart){
                    coll.find({groupId,"items.itemId":reqitem.itemId},(err,item)=>{

                        if(item){
                            coll.update(
                                {   
                                    groupId,"items.itemId":item.itemId 
                                },
                                {
                                    "$inc":{"items.$.qty": 1}
                                }
                            );
                        }
                        else{
                            coll.update(
                                { groupId },
                                {
                                  $push: {
                                    items: 
                                    { 
                                        itemId:reqitem.itemId,itemName:reqitem.itemName,quantity:1
                                    }
                                  }
                                }
                             );     
                        }
                        
                    });
                }
                else{
                    coll.insert({
                        groupId,
                        "items":[{itemId:reqitem.itemId,itemName:reqitem.itemName,quantity:1}],
                    });
                }

            });

            
        });    
    }
    catch (e){
        console.log("error");
    } 
});



router.get('/removeFromPersonalCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var reqitem = req.body.item;
            var userId = req.body.userId;
            var coll = db.collection('personalcartitems');

            coll.update(
                {  userId },
                { $pull: { "items": { "id":reqitem.itemId } } }
            )
        });    
    }
    catch (e){
        console.log("error");
    } 
});

router.get('/removeFromGroupCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var reqitem = req.body.item;
            var groupId = req.body.groupId;
            var coll = db.collection('groupcartitems');

            coll.update(
                {  groupId },
                { $pull: { "items": { "id":reqitem.itemId } } }
            )
        });    
    }
    catch (e){
        console.log("error");
    } 
});

module.exports = router;
