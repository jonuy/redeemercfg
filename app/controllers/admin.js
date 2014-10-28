var express = require('express')
  , modelStudy = require('../models/study')
  ;

var router = express.Router();

router.get('/admin', function(req, res) {
  console.log('Rendering admin view');

  var currentStudy;
  var studies = [];
  // Get list of all studies
  modelStudy.find({}, function(err, docs) {
    if (err) {
      console.log(err);
      res.send(500);
      return;
    }

    for (var i = 0; docs && i < docs.length; i++) {
      if (docs[i].is_current_study) {
        currentStudy = docs[i];
      }
      else {
        studies[studies.length] = docs[i];
      }
    }

    var data = {
      currentStudy: currentStudy,
      studies: studies
    };

    res.render('admin', data);
  });
});

// Show admin create screen
router.get('/admin/create', function(req, res) {
  console.log('Rendering admin/create view');
  res.render('admin_create', {});
});

// Create new study document
router.post('/admin/study', function(req, res, next) {

});

// Select current study document
router.post('/admin/current_study', function(req, res) {

});

module.exports = router;