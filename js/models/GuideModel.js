define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],

  function($, _, Backbone) {
    var GuideModel = Backbone.Model.extend({
      url: 'data/2014/03_14_2014.json',
      
      initialize: function() {
      },
    });

    return GuideModel;
  }
);