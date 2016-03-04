define(['models/loggedUser', 'backboneSyphon'], (user) => {
  const LoginForm = Backbone.View.extend({
    className: 'container',

    template: _.template($('#loginPage').html()),

    render: function() {
      this.$el.html(this.template({ errors: this.validationErrors }));

      return this;
    },

    events: {
      'click button.login-button': 'login',
      'click button.register-button': 'goToRegister'
    },

    login: function() {
      this.validationErrors = undefined;
      var model = Backbone.Syphon.serialize(this);

      user.request('user:login', model)
      .then((loggedIn) => {
        if (loggedIn) {
          require(['router'], (router) => {
            router.navigate('dashboard', { trigger: true });
          });
        } else {
          this.validationErrors = "Authentication failed";
          this.render();
        }
      });
    },
    goToRegister: function() {
      require(['router'], (router) => {
        router.navigate('register', { trigger: true });
      });
    }
  });

  return {
    LoginForm
  };
});
