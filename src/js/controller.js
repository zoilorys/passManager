define(['views/dashboard',
        'views/login',
        'views/register',
        'models/passwords',
        'models/loggedUser'], (dash, login, reg, passwords, user) => {
  const root = $('#app');

  // helper function to abstract appending to root element
  function render() {
    root.empty().append.apply(root, arguments);
  }

  //main app controller object
  const controller = {
    loginPage: function() {
      user.request('user:check')
      .then(() => require(['router'], router => router.navigate('dashboard', { trigger:true })))
      .catch(() => {
        //little bit of monkey code, to display successful registration
        var success = '';

        if (window.location.search === '?success') {
          success = "Registration successful!";
        }

        render(
          new login.LoginForm({
            model: {
              success: success
            }
          }).render().el
        );
      });
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
