var mongoose = require('mongoose')
  ;

var schema = new mongoose.Schema({
  study: mongoose.Schema.Types.ObjectId
}, {collection: 'current_states'});

var model = mongoose.model('current_state', schema);

module.exports = model;