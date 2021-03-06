var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
// require('./routes/passport')(passport);
var mongoURL = "mongodb://localhost:27017/login";
// var kafka = require('./routes/kafka/client');

var mongo = require("./routes/mongo");
var routes = require('./routes/index');
var users = require('./routes/users');
// var file = require('./routes/files');
var mongoSessionURL = "mongodb://localhost:27017/login";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: true,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 3 * 60 * 60,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL,
        ttl: 3*60*60
    })
}));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

module.exports = app;
