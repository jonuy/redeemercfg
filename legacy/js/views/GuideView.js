define(
  [
    'jquery',
    'underscore',
    'backbone',
    'text!templates/2014_template.html'
  ],

  function($, _, Backbone, template) {

    var GuideView = Backbone.View.extend({
      template: '',

      events: {
        'click #goWorship': 'goWorship',
        'click #goStudy': 'goStudy',
      },

      el: $('#page-content'),

      render: function() {
        var programData = this.dataModel;
        var compiledTemplate = _.template(template, programData.attributes);
        this.$el.append(compiledTemplate);
      },

      // Use SwipeJS API to go to worship li section
      goWorship: function() {
        window.mySwipe.prev();
      },

      // Use SwipeJS API to go to study li section
      goStudy: function() {
        window.mySwipe.next();
        $('html, body').animate({scrollTop: 0}, 'slow');
      }

    });

    return GuideView;
  }
);