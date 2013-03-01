define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],

  function($, _, Backbone) {
    var GuideModel = Backbone.Model.extend({
      url: 'data/03_01_2013.json',
      
      initialize: function() {
      },
    });

    return GuideModel;
  }
);