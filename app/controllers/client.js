var express = require('express')
  , mongoose = require('mongoose')
  , commonmark = require('../lib/commonmark')
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
      var writer = new commonmark.HtmlRenderer();
      var reader = new commonmark.DocParser();

      var data = {};

      if (doc) {
        data.title = doc.title;
        data.subtitle = doc.subtitle;
        data.scripture_verse = doc.scripture_verse;
        data.scripture_body = writer.renderBlock(reader.parse(doc.scripture_body));

        data.sections = [];
        for (var i = 0; doc.sections && i < doc.sections.length; i++) {
          data.sections[i] = {};
          data.sections[i].section_title = doc.sections[i].section_title;
          data.sections[i].section_body = writer.renderBlock(reader.parse(doc.sections[i].section_body));
        }

        data.worship = [];
        for (var i = 0; doc.worship && i < doc.worship.length; i++) {
          data.worship[i] = {};
          data.worship[i].worship_title = doc.worship[i].worship_title;
          data.worship[i].worship_body = writer.renderBlock(reader.parse(doc.worship[i].worship_body));
        }
      }

      res.render('client', data);
    }
  });

});

module.exports = router;