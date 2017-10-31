var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/getmembers', function(req,resp){
    if(req.session && req.session.user){
        var showMembers = "select owner_id, permission from user_group where group_id ='"+req.body.groupId+"'";
        mysql.fetchData(function(err, res){
            console.log(res);
            var values = [];
            for(var i= 0; i<res.length; i++){
                values.push([res[i].owner_id]);
            }
            console.log(values);
            var str = "select * from dropbox_users where user_id in (?)";
            mysql.getUsers(str, function(err, result){
                if(err){
                    throw err;
                }
                else{
                    resp.status(201).json(result);
                }
            },values)
        }, showMembers);
    }
    else{
        resp.status(401).json({message:"session not working"});
    }
});

//delete group member
router.post('/delmember', function(req, res){
    if(req.session && req.session.user) {
        var values = [];
        for (var i = 0; i < req.body.arr.length; i++) {
            values.push([req.body.arr[i].userId]);
        }
        var delMember = "delete from user_group where group_id = '"+req.body.groupId+"' and owner_id in (?)";
        mysql.getUsers(delMember, function (err, result) {
            if (err) {
                throw err;
            }
            else{
                res.status(201).json({message:"user(s) deleted"});
            }
        }, values);
    }
    else{
        res.status(401).json({message:"session expired"});
    }
})
module.exports = router;
