var express = require('express');
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/cmpe281";

router.post('/', (req,res,next)=>{
    
    
    try {
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = db.collection('items');

            coll.findOne({}, function(err, item){
                if (item) {
                    console.log(item);
                    res.status(201).json({item});
                } else {
                    
                    res.status(202).send({"message":"Signup Successful"});
                }
            });
        });

    }
    catch (e){
        console.log("error in insertion");
    }
});

module.exports = router; 

