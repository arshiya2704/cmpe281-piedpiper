var User = require('./models/user');


module.exports = function(app, passport){
	app.get('/',function(req,res){
		//res.send("hello world");
		res.render('index.ejs');
	});
	app.get('/login', function(req,res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup',function(req,res){
		res.render('signup.ejs', { message: req.flash('signupMessage')});
	});

	

	app.post('/signupone', function(req,res){
		var newUser = new User();
		var cryptedPassword = req.body.password;
		newUser.local.username = req.body.email;
		newUser.local.password = newUser.generateHash(cryptedPassword);
		newUser.local.firstName = req.body.fName;
		newUser.local.lastName = req.body.lName;
		newUser.local.address = req.body.address;
		newUser.local.phoneNumber = req.body.phNo;
		newUser.save(function (err) {
			if(err){
				throw err;
			}
		});
		res.redirect('/login');
	});

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user })
	})

	app.get('/index',function(req,res){
		res.render('file.ejs')
	})
	
  app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
