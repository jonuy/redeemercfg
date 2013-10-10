define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],

  function($, _, Backbone) {
    var GuideModel = Backbone.Model.extend({
      url: 'data/fall2013/10_11_2013.json',
      
      initialize: function() {
      },
    });

    return GuideModel;
  }
);