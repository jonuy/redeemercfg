var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('Rendering main client view');

  res.render('client', {});
});

module.exports = router;