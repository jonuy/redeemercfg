var express = require('express')
  , bodyParser = require('body-parser')
  , path = require('path')
  , mongoose = require('mongoose')
  ;

var app = express();

// Express config
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());

// 'public' specified as the public directory
app.use(express.static(path.join(__dirname, 'app/public')));

// Mongoose connect
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/redeemercfg');

// Setting up controllers
var admin = require('./app/controllers/admin');
var client = require('./app/controllers/client');
var study = require('./app/controllers/study');
app.use('/', admin);
app.use('/', client);
app.use('/', study);

// Starting server
app.listen(app.get('port'), function() {
  console.log('redeemercfg listening on port ' + app.get('port'));
});