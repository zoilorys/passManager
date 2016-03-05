define(['backboneRadio'], () => {
  const Password = Backbone.Model.extend({
    defaults: {},

    validate: function(attrs) {
      var errors = [];

      if (attrs.name === '' || attrs.password === '') {
        errors.push("All fields must be filled");
      }

      var regex = new RegExp('[a-zA-Z0-9]{3,16}');

      if (!regex.test(attrs.name)) {
        errors.push("Name must contain 3-16 letters and numbers");
      }

      if (!regex.test(attrs.password)) {
        errors.push("Password must contain 3-16 letters and numbers");
      }

      if (errors.length > 0) {
        return errors;
      }
    },

    idAttribute: 'id'
  });

  const PasswordsCollection = Backbone.Collection.extend({
    url: () => '/api/passwords',
    model: Password
  });

  const passwords = new PasswordsCollection({
    model: Password
  });

  var passwordsChannel = Backbone.Radio.channel('passwords');

  passwordsChannel.reply('passwords:get:instance', data => new Password(data))

  passwordsChannel.on('passwords:add', function(model) {
    passwords.create(model, {
      silent: true,
      wait: true,
      success: function() {
        passwords.trigger("update");
      }
    });
  });

  passwordsChannel.on('passwords:delete', id => {
    passwords.get(id).destroy();
  });

  passwordsChannel.on('passwords:update', (model, update) => {
    Object.keys(update).forEach((key) => model.set(key, update[key]));
    model.save();
  });

  passwordsChannel.reply('passwords:authorize', model => {
    return passwords.fetch().then(() => {
      return passwords.find(entry => {
        return entry.get('name') === model.get('name') && entry.get('password') === model.get('password');
      });
    });
  });

  passwordsChannel.reply('passwords:get', () => {
    return passwords;
  });

  return passwordsChannel;
})
