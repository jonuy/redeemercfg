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


// TEMP DATA //
if (process.env.NODE_ENV != 'production') {
var modelStudy = require('./app/models/study');
modelStudy.findOne({}, function(err, doc) {
  if (err) {
    console.log(err);
  }
  else if (!doc) {
    modelStudy.create({
      is_current_study: true,
      name: 'DEFAULT_NAME',
      title: 'The Prayer of Prayers',
      subtitle: 'Struggle: Thy Will Be Done',
      scripture_verse: 'Matthew: 26:36-46',
      scripture_body: "<p><span class='super'>36</span> Then Jesus went with his disciples to a place called Gethsemane, and he said to them, “Sit here while I go over there and pray.” <span class='super'>37</span> He took Peter and the two sons of Zebedee along with him, and he began to be sorrowful and troubled. <span class='super'>38</span> Then he said to them, “My soul is overwhelmed with sorrow to the point of death. Stay here and keep watch with me.”</p>",
      sections: [
        {
          section_title: 'Additional Section 1',
          section_body: 'Body for section 1.'
        },
        {
          section_title: 'Additional Section 2',
          section_body: 'Body for section 2.'
        },
        {
          section_title: 'Additional Section 3',
          section_body: 'Body for section 3.'
        }
      ]
    }, function(err, createdDoc) {
      if (err) {
        console.log(err);
      }
    });
  }
});
}
// end TEMP DATA //

// Starting server
app.listen(app.get('port'), function() {
  console.log('redeemercfg listening on port ' + app.get('port'));
});