var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var upload = require("express-fileupload");


var configDB = require('./config/database.js');
mongoose.connect(configDB.url, { 
	useMongoClient: true
});
require('./config/passport')(passport);
var app = express();
var port = process.env.PORT || 8080;



app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
	secret : 'anystringoftext',
	saveUninitialized : true,
	resave : true,
	store: new MongoStore({ mongooseConnection: mongoose.connection,
		ttl: 2 * 24 * 60 * 60
	})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

 app.use(function(req, res, next){
	console.log(req.session);
	console.log("===================");
	console.log(req.user);
	next();
});


app.set('view engine', 'ejs');

/*app.use('/',function(req,res){
	res.send('first program');
	console.log(req.cookies);
	console.log('=============');
	console.log(req.session);

});*/

require('./app/routes.js')(app,passport);

app.listen(port);
 console.log('server running on port ' + port);

 module.exports = app;
