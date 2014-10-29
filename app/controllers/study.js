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

  if (req.body.sections && req.body.sections.length > 0) {
    data.sections = [];

    for (var i = 0; i < req.body.sections.length; i++) {
      data.sections[i] = {};
      data.sections[i].section_title = req.body.sections[i].section_title;
      data.sections[i].section_body = req.body.sections[i].section_body;
    }
  }

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