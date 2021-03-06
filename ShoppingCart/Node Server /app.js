var express = require('express');
var http = require('http');
var path = require('path');
var index = require('./routes/index');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: '*'}));

app.use('/',index);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;