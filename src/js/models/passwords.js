define(['backbone'], () => {
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

  return passwords;
})
