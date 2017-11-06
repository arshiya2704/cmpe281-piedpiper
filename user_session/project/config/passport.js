var localStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport){
	passport.serializeUser(function(user,done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id,done){
		User.findById(id, function(err,user){
			done(err, user);

		});
	});

	

	passport.use('local-login', new localStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({ 'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(!user)
					return done(null, false, req.flash('loginMessage', 'no user found'));
				if (!user.validPassword(password)) {
						return done(null, false, req.flash('loginMessage', 'invalid password'));
				}
					
				req.session.user = user.local.username;
				console.log(req.session.user);
				console.log("session initialised");	
				
				return done(null, user);
			});
		});
	}
));

};
