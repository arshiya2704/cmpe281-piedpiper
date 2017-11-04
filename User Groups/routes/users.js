var express = require('express');
var mongo = require("./mongo")
var mongoURL = "mongodb://localhost:27017/bonappetit";
var router = express.Router();
var

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/creategroup', function(req, res) {
    try{
        mongo.connect(mongoURL, function(){
            var coll = mongo.collection('groups')

            var groupObj = {}
            groupObj.users = req.body.users;
            groupObj.name = req.body.name;
            //groupObj.timestamp = {$type:"timestamp"}
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


module.exports = router;
