var express = require('express');
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://ip-10-1-1-157.us-west-1.compute.internal,ip-10-1-2-224.us-west-1.compute.internal/bonapettit?replicaSet=example-replica-set";

 

router.get('/',(req,res)=>{
    res.status(201).send({"message":"Alive"});
})

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

router.post('/getGroupCartItems', function (req, res, next) {
    
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

                    console.log("length :"+cart.items.length);

                    if(cart.items.length >0){
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
                        coll.update(
                            { userId },
                            {
                                $push: {
                                items: 
                                { 
                                    itemId:reqitem.itemId,itemName:reqitem.itemName,quantity:1
                                }
                                }
                        });   
                    }
                }
                else{
                    coll.insert({
                        userId,
                        "items":[{itemId:reqitem.itemId,itemName:reqitem.itemName,quantity:1}],
                    });
                }
                res.status(201).send({"message":"Item added Successfully"});

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
                res.status(201).send({"message":"Item added Successfully"});

            });

            
        });    
    }
    catch (e){
        console.log("error");
    } 
});



router.post('/removeFromPersonalCart', function(req, res, next) {
    try{
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var reqitem = req.body.item;
            var userId = req.body.userId;
            var coll = db.collection('personalcartitems');
            console.log("here");
            coll.update(
                {  userId },
                { $pull: { "items": { "itemId":reqitem.itemId } } }
            )
            res.status(201).send({"message":"Item removed Successfully"});
        });    
    }
    catch (e){
        console.log("error");
    } 
});

router.post('/removeFromGroupCart', function(req, res, next) {
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
            res.status(201).send({"message":"Item removed Successfully"});
        });    
    }
    catch (e){
        console.log("error");
    } 
});

module.exports = router;
