var express = require('express');
var http = require('http');
var path = require('path');
const axios = require('axios');
var app = express();
var index = require('./routes/index');

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;


