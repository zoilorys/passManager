requirejs.config({
  baseUrl: 'assets/js',

  paths: {
    jquery: '../../jquery/dist/jquery.min',
    underscore: '../../underscore/underscore-min',
    backbone: '../../backbone/backbone-min',
    bluebird: '../../bluebird/js/browser/bluebird.min',
    backboneSyphon: '../../backbone.syphon/lib/backbone.syphon.min',
    backboneRadio: '../../backbone.radio/build/backbone.radio',
    localStorage: '../../backbone.localStorage/backbone.localStorage-min'
  },

  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require(['backbone', 'router']);
