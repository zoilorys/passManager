define(['models/loggedUser', 'models/passwords', 'backboneSyphon'], (user, passwords) => {
  const LoginForm = Backbone.View.extend({
    className: 'col-md-6 col-md-offset-3',

    template: _.template($('#loginPage').html()),

    render: function() {
      this.$el.html(this.template({
        successMessage: this.model.success,
        errors: this.validationErrors
      }));

      return this;
    },

    events: {
      'click button.login-button': 'login',
      'click button.register-button': 'goToRegister',
      'keyup input': 'listenKey'
    },

    login: function() {
      this.validationErrors = undefined;
      var data = Backbone.Syphon.serialize(this);

      var model = passwords.request('passwords:get:instance', data);

      if (model.isValid()) {
        user.request('user:login', model)
        .then((loggedIn) => {
          if (loggedIn) {
            require(['router'], (router) => {
              router.navigate('dashboard', { trigger: true });
            });
          } else {
            this.validationErrors = ["Authentication failed"];
            this.render();
          }
        });
      } else {
        this.validationErrors = model.validationError;
        this.render();
      }
    },
    goToRegister: function() {
      require(['router'], (router) => {
        router.navigate('register', { trigger: true });
      });
    },
    listenKey: function(e) {
      if (e.which === 13) {
        this.login();
      }
    }
  });

  return {
    LoginForm
  };
});
