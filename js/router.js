define(
  [
    'jquery',
    'underscore',
    'backbone',
    'models/GuideModel',
    'views/GuideView',
    'libs/swipejs/swipe-1.0.min',
  ],

  function($, _, Backbone, GuideModel, GuideView) {

    var guideModel = new GuideModel();

    var AppRouter = Backbone.Router.extend({
      routes: {
        '': 'showHome' 
      },
      showHome: function() {
        var guideView = new GuideView();
        this.renderPage(guideView);
      },
      renderPage: function(view) {
        $('#page-content').empty();

        var onModelFetched = function(data) {
          view.dataModel = guideModel;
          view.render();

          window.mySwipe = new Swipe(document.getElementById('slider'), {startSlide:1});
        };

        guideModel.fetch({success:onModelFetched});
      }
    });

    var initialize = function() {

      var appRouter = new AppRouter();

      Backbone.history.start();

    };

    return {
      initialize: initialize
    };
  }
);