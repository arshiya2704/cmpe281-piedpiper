var express = require('express');
var mongo = require("./mongo")
var mongoURL = "mongodb://localhost:27017/bonappetit";
//var mongoURL = "mongodb://ip-10-1-2-245.us-west-1.compute.internal,ip-10-1-3-35.us-west-1.compute.internal/bonapetit?replicaSet=example-replica-set"
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({message:"respond with a resource"});
});

router.post('/ping', function(req, res){
    res.status(200).send({message:"Is alive"})

})

router.post('/creategroup', function(req, res) {
    try{
        mongo.connect(mongoURL, function(){
            var coll = mongo.collection('groups')

            var groupObj = {}
            groupObj.users = req.body.users;
            groupObj.name = req.body.name;
            //groupObj.timestamp = {$type:"timestamp"}
            groupObj.timestamp = new Date();
            coll.insertOne(groupObj, function(err, result) {
                if (err) {
                    res.status(400).json({
                        message: "not inserted",
                        error: err
                    })
                }
                else{
                    var grpid = result.insertedId;
                coll.findOne({_id: grpid}, function (err, results) {
                    if (err) {
                        res.status(400).json({
                            message: "not inserted",
                            error: err
                        })
                    }
                    else{
                        res.status(200).json({
                            req_id: req.body.req_id,
                            group_id: grpid,
                            created_at: results.timestamp
                        })
                }
                })
            }
            })
        })
    }
    catch(err){
        console.log("this is error")
    }
});

module.exports = router