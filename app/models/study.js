var mongoose = require('mongoose')
  ;

var schema = new mongoose.Schema({
  is_current_study: {type: Boolean, default: false},
  name: String,
  title: String,
  subtitle: String,
  scripture_verse: String,
  scripture_body: String,
  sections: [{
    section_title: String,
    section_body: String
  }]
}, {collection: 'studies'});

var model = mongoose.model('study', schema);

module.exports = model;