requirejs.config({
  baseUrl: 'assets/js',

  paths: {
    jquery: '../../jquery/dist/jquery.min',
    underscore: '../../underscore/underscore-min',
    backbone: '../../backbone/backbone-min',
    bluebird: '../../bluebird/js/browser/bluebird.min'
  },

  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require(['backbone', 'models/passwords', 'views/dashboard', 'bluebird'], (bb, collection, dash, Promise) => {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'loginPage',
      'register/': 'registerPage',
      'dashboard/': 'dashboardPage'
    },

    loginPage: function() {

    },

    registerPage: function() {

    },

    dashboardPage: function() {

    }
  });

  var AppRouter = new Router();

  Backbone.history.start({ pushState: true });

  collection.fetch()
  .then(() => {
    $('#app').append(
      new dash.AddListEntry().render().el,
      new dash.ListContainer({collection: collection}).render().el
    );
  });

});
