var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res) {
  console.log('Rendering admin view');

  res.render('admin', {});
});

module.exports = router;