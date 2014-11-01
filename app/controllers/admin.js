var express = require('express')
  , modelStudy = require('../models/study')
  ;

var router = express.Router();

/**
 * GET /admin
 */
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
      
      studies[studies.length] = docs[i];
    }

    var data = {
      title: 'redeemercfg - admin',
      studies: studies
    };

    res.render('admin', data);
  });
});

/**
 * GET /admin/create
 *
 * Show admin create screen
 */
router.get('/admin/create', function(req, res) {
  console.log('Rendering admin/create view');
  res.render('admin_create', {title: 'redeemercfg - admin/create'});
});

module.exports = router;