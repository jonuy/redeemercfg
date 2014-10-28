var express = require('express')
  , mongoose = require('mongoose')
  ;

var router = express.Router();

router.get('/', function(req, res) {
  console.log('Rendering main client view');

  var modelStudy = require('../models/study');

  modelStudy.findOne({is_current_study: true}, function(err, doc) {
    if (err) {
      console.log(err);
      res.send(500);
    }
    else {
      var data = {};

      if (doc) {
        data.title = doc.title;
        data.subtitle = doc.subtitle;
        data.scripture_verse = doc.scripture_verse;
        data.scripture_body = doc.scripture_body;
        data.sections = doc.sections;
      }

      res.render('client', data);
    }
  });

});

module.exports = router;