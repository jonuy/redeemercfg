require.config({
  enforceDefine: false,
  paths: {
    backbone: 'libs/backbone/backbone-0.9.9.min',
    jquery: 'libs/jquery/jquery-1.8.3.min',
    underscore: 'libs/underscore/underscore-1.4.3.min',
    templates: '../templates',
  },
  // Shims required because Backbone and Underscore are no longer AMD compatible
  // Could instead use the AMD compatible js files here: https://github.com/amdjs
  shim: {
    underscore: {
      deps: [],
      exports: '_', // Must be '_', because that's how Underscore.js declares the global variable
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone',  // Must be capitalized because Backbone.js declares the global variable as "Backbone"
    },
  },
});

define(
  [
    'app',
  ],
  function(App) {
    App.initialize();
  }
);