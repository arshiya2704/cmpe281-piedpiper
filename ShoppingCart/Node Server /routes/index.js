var express = require('express');
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://ec2-13-56-84-60.us-west-1.compute.amazonaws.com,ec2-13-57-127-153.us-west-1.compute.amazonaws.com/bonapettit?replicaSet=example-replica-set";

 

router.post('/getPersonalCartItems', function (req, res, next) {
    
        try{
            mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var userId = req.body.userId;

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
                            console.log("Item found:" +reqitem.itemId);
                            coll.update(
                                {   
                                    userId,"items.itemId":reqitem.itemId 
                                },
                                {
                                    "$inc":{"items.$.quantity": 1}
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
                                    groupId,"items.itemId":reqitem.itemId 
                                },
                                {
                                    "$inc":{"items.$.quantity": 1}
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
