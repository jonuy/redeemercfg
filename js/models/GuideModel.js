define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],

  function($, _, Backbone) {
    var GuideModel = Backbone.Model.extend({
      url: 'data/03_22_2013.json',
      
      initialize: function() {
      },
    });

    return GuideModel;
  }
);