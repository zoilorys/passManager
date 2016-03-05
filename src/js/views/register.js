define(['models/passwords'], (passwords) => {
  const RegForm = Backbone.View.extend({
    className: 'col-xs-6 col-md-offset-3',

    template: _.template($('#regPage').html()),

    render: function() {
      this.$el.html(this.template({ errors: this.validationErrors }));

      return this;
    },

    events: {
      'click button.register-button': 'register',
      'click button.back-button': 'goToLogin',
      'keyup input': 'listenKey'
    },

    register: function() {
      this.validationErrors = undefined;
      var data = Backbone.Syphon.serialize(this);

      var model = passwords.request('passwords:get:instance', data);

      if (model.isValid()) {
        passwords.request('passwords:authorize', model)
        .then(response => {
          console.log(response);
          if (response) {
              this.validationErrors = ["User already exist"];
              this.render();
          } else {
            passwords.trigger('passwords:add', model);
            require(['router'], (router) => {
              router.navigate('?success', { trigger: true });
            });
          }
        });
      } else {
        this.validationErrors = model.validationError;
        this.render();
      }
    },
    goToLogin: function() {
      require(['router'], (router) => {
        router.navigate('', { trigger: true });
      });
    },
    listenKey: function(e) {
      if (e.which === 13) {
        this.register();
      }
    }
  });

  return {
    RegForm
  }
});
