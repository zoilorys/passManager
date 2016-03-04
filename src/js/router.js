define(['backbone', 'controller', 'backboneRadio'], (bb, controller) => {
  const Router = Backbone.Router.extend({
    routes: {
      '': 'loginPage',
      'register': 'registerPage',
      'dashboard': 'dashboardPage'
    },

    loginPage: function() {
      controller.loginPage();
    },

    registerPage: function() {
      controller.registerPage();
    },

    dashboardPage: function() {
      controller.dashboardPage();
    }
  });

  const AppRouter = new Router();

  Backbone.history.start({ pushState: true });

  return AppRouter;
});
