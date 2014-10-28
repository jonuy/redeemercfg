var express = require('express')
  , modelStudy = require('../models/study')
  ;

var router = express.Router();

router.post('/study', function(req, res) {
  if (!req.body || !req.body.name || !req.body.title || !req.body.subtitle
    || !req.body.scripture_verse || !req.body.scripture_body) {
    res.status(400).send('Missing required parameter(s)');
    return;
  }
  

  console.log('Creating a new study in database.');

  var data = {
    name: req.body.name,
    title: req.body.title,
    subtitle: req.body.subitle,
    scripture_verse: req.body.scripture_verse,
    scripture_body: req.body.scripture_body
  };

  modelStudy.create(data, function(err, doc) {
    if (err) {
      console.log(err);
    }

    if (doc) {
      console.log('Doc created:', doc);
      res.status(201).send();
    }
  });
});

module.exports = router;