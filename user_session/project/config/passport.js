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

	passport.use('local-signup', new localStrategy({
		firstNameField: 'fName',
		secondNameField: 'lName',
		addressField: 'address',
		phoneNoField: 'phNo',
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, fName, lName, address, phNo, email, password,done){
		process.nextTick(function(){
			//console.log("there");
			User.findOne({'local.username': email}, function(err, user){
				if(err){
					//console.log("hii");
					return done(err);
				}
				if(user){
					//console.log("wahan");
					return done(null, false, req.flash('signupMessage', 'that mail is taken'));
				} else {
					console.log("yahan");
					console.log(fName);
					console.local(lname);
					console.log(password);
					var newUser = new User();
					newUser.local.fName = fName;
					newUser.local.lName = lName;
					newUser.local.address = address;
					newUser.local.phNo = phNo;
					newUser.local.username = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})
		});
	}));

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
					
				return done(null, user);
			});
		});
	}
));

};
