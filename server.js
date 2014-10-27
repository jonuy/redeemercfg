var express = require('express')
  , path = require('path')
  , mongoose = require('mongoose')
  ;

var app = express();

// Express config
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// 'public' specified as the public directory
app.use(express.static(path.join(__dirname, 'app/public')));

// Mongoose connect
mongoose.connect(process.env.DB_URI || 'mongodb://localhost/redeemercfg');

// Setting up controllers
var admin = require('./app/controllers/admin');
var client = require('./app/controllers/client');
app.use('/', admin);
app.use('/', client);

// Starting server
app.listen(app.get('port'), function() {
  console.log('redeemercfg listening on port ' + app.get('port'));
});