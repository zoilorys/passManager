define(['views/dashboard',
        'views/login',
        'views/register',
        'models/passwords',
        'models/loggedUser'], (dash, login, reg, passwords, user) => {
  const root = $('#app');

  function render() {
    root.empty().append.apply(root, arguments);
  }

  const controller = {
    loginPage: function() {
      user.request('user:check')
      .then(() => require(['router'], router => router.navigate('dashboard', { trigger:true })))
      .catch(() => render(
        new login.LoginForm().render().el
      ));
    },
    registerPage: function() {
      user.request('user:check')
      .then(() => require(['router'], router => router.navigate('dashboard', { trigger:true })))
      .catch(() => render(
        new reg.RegForm().render().el
      ));
    },
    dashboardPage: function() {
      user.request('user:check')
      .then(() => {
        var collection = passwords.request('passwords:get');

        collection.fetch()
        .then(() => {
          render(
            new dash.AddListEntry().render().el,
            new dash.ListContainer({ collection: collection }).render().el
          );
        });
      })
      .catch(() =>
        require(['router'], router => router.navigate('', { trigger:true }))
      );
    }
  };

  return controller;
});
