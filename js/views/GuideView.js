define(
  [
    'jquery',
    'underscore',
    'backbone',
    'text!templates/guide.html'
  ],

  function($, _, Backbone, template) {

    var GuideView = Backbone.View.extend({
      template: '',

      el: $('#page-content'),

      render: function() {
        var programData = this.dataModel;
        var compiledTemplate = _.template(template, programData.attributes);
        this.$el.append(compiledTemplate);
      }

    });

    return GuideView;
  }
);