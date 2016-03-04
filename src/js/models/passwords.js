define(['backboneRadio'], () => {
  const Password = Backbone.Model.extend({
    defaults: {},
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
        return entry.get('name') === model.name && entry.get('password') === model.password;
      });
    });
  });

  passwordsChannel.reply('passwords:get', () => {
    return passwords;
  });

  return passwordsChannel;
})
