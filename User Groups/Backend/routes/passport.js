var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
// var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username   , password, done) {
        try {
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('login');

                coll.findOne({username: username, password:password}, function(err, user){
                    if (user) {
                        console.log("user::", user);
                        done(null, user);

                    } else {
                        done(null, false);
                    }
                });
            });
        }
        catch (e){
            done(e,{});
        }
    }));


    passport.use('signup', new LocalStrategy(function(username   , password, done) {
        try {
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('login');

                coll.insertOne({username: username, password:password}, function(err, user){
                    if (user) {
                        done(null, {username: username, password: password});

                    } else {
                        done(null, false);
                    }
                });
            });
        }
        catch (e){
            done(e,{});
        }
    }));

};


