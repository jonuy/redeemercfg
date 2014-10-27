var express = require('express')
  , mongoose = require('mongoose')
  ;

var router = express.Router();

router.get('/', function(req, res) {
  console.log('Rendering main client view');

  var modelCurrentState = require('../models/current_state');
  var modelStudy = require('../models/study');

  var findCurrState = modelCurrentState.findOne({}).exec();
  findCurrState.then(
    function(doc) {
      if (doc) {
        return modelStudy.findOne({_id: doc.study});
      }
      else {
        return null;
      }
    },
    function(err) {
      console.log(err);
      res.send(500);
    }
  ).then(
    function(doc) {
      var data = {};

      if (doc) {
        data.title = doc.title;
        data.subtitle = doc.subtitle;
        data.scripture_verse = doc.scripture_verse;
        data.scripture_body = doc.scripture_body;
        data.sections = doc.sections;
      }

      res.render('client', data);
    },
    function(err) {
      console.log(err);
      res.send(500);
    }
  );

});

module.exports = router;