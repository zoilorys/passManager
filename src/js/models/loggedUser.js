define(['models/passwords', 'localStorage', 'backboneRadio', 'bluebird'], (passwords) => {
  const User = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("z:pm:userdata")
  });

  var user = new User({id: 1});

  const userChannel = Backbone.Radio.channel('user');

  userChannel.reply('user:login', model => {
    return passwords.request('passwords:authorize', model)
      .then((auth) => {
        if (auth) {
          user.set(model);
          user.save();
          return true;
        } else {
          return false;
        }
      });
  });

  userChannel.reply('user:logout', () => {
    return user.destroy();
  });

  userChannel.reply('user:check', () => {
    return new Promise((resolve, reject) => {
      user.fetch({
        success: resolve,
        error: reject
      });
    })
  });

  return userChannel;
});
