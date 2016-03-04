define(['models/passwords'], (passwords) => {
  const RegForm = Backbone.View.extend({
    className: 'container',

    template: _.template($('#regPage').html()),

    render: function() {
      this.$el.html(this.template({ errors: this.validationErrors }));

      return this;
    },

    events: {
      'click button.register-button': 'register',
      'click button.back-button': 'goToLogin'
    },

    register: function() {
      this.validationErrors = undefined;
      var model = Backbone.Syphon.serialize(this);
      passwords.trigger('passwords:add', model);
      this.goToLogin();
    },
    goToLogin: function() {
      require(['router'], (router) => {
        router.navigate('', { trigger: true });
      });
    }
  });

  return {
    RegForm
  }
});
