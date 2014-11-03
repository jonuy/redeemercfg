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
  // @todo Sort by Date
  modelStudy.find({}, function(err, docs) {
    if (err) {
      console.log(err);
      res.send(500);
      return;
    }

    for (var i = 0; docs && i < docs.length; i++) {
      studies[i] = docs[i];

      // More readable date string
      if (typeof studies[i].date === 'object') {
        var date = studies[i].date;
        var m  = date.getMonth() + 1;
        var d = date.getDate();
        var y = date.getFullYear();
        studies[i].dateString = m + '/' + d + '/' + y;
      }

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
  res.render('admin_create',
    {
      title: 'redeemercfg - admin/create',
      scripts_dir: '../'
    });
});

/**
 * GET /admin/edit/:id
 *
 * Admin edit screen
 */
router.get('/admin/edit/:id', function(req, res) {
  modelStudy.findOne(
    {_id: req.params.id},
    function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Rendering admin/edit view');
        res.render('admin_create',
          {
            title: 'redeemercfg - admin/edit',
            scripts_dir: '../../',
            study: doc
          });
      }
    }
  );
});

module.exports = router;