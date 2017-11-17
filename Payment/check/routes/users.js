var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/deduct', function(req, res){
    console.log('Body : ', req.body);
    res.send({message:"ok"});
});

module.exports = router;
