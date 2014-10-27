var express = require('express')
  , path = require('path')
  ;

var app = express();

// Express config
app.set('port', process.env.PORT || 3000);
// app.engine('jade', require('jade').__express);
// app.engine('html', require('jade').__express);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// 'public' specified as the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Setting up controllers
var client = require('./app/controllers/client');
app.use('/', client);

// Starting server
app.listen(app.get('port'), function() {
  console.log('redeemercfg listening on port ' + app.get('port'));
});