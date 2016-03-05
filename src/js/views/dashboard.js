define(['models/passwords', 'models/loggedUser', 'backboneSyphon'], (passwords, user) => {
  const AddListEntry = Backbone.View.extend({
    className: 'row z-header',
    template: _.template($('#list-add-item').html()),

    render: function() {
      this.el.innerHTML = this.template();

      return this;
    },

    events: {
      'click button.add-entry-button': 'addEntry',
      'click button.logout-button': 'logout',
      'keyup input': 'listenKey'
    },

    addEntry: function() {
      let entry = Backbone.Syphon.serialize(this);

      passwords.trigger('passwords:add', entry);
      this.$('input[name="name"]').val('');
      this.$('input[name="password"]').val('')
    },

    logout: function() {
      user.request('user:logout')
      require(['router'], router => router.navigate('', { trigger: true }));
    },

    listenKey: function(e) {
      if (e.which === 13) {
        this.addEntry();
      }
    }
  });

  const ListEntry = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#list-entry').html()),

    render: function() {
      this.model.set('showPassword', this.showPassword);
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    showPassword: false,

    events: {
      'click button.toggle-password': 'toggleShow',
      'click button.edit-password': 'editPassword'
    },

    toggleShow: function() {
      this.showPassword = !this.showPassword;
      this.render();
    },

    editPassword: function() {
      var update = Backbone.Syphon.serialize(this);
      passwords.trigger('passwords:update', this.model, update);
      this.render();
    }
  });

  const ListContainer = Backbone.View.extend({
    tagName: 'table',
    className: 'table table-striped table-hover z-table',
    template: _.template($('#list-container').html()),

    initialize: function() {
      this.collection.on('update', () => {
        this.render();
      });
    },

    render: function() {
      this.$el.empty().append(this.template());

      this.$el.find('tbody').append(this.collection.map((model) => {
        return new ListEntry({model:model}).render().el;
      }));
      return this;
    },

    events: {
      'click button.delete-password': 'deletePassword'
    },

    deletePassword: function(e) {
      var id = parseInt($(e.target).attr('data-index'));
      passwords.trigger('passwords:delete', id);
    }
  });

  return {
    AddListEntry,
    ListEntry,
    ListContainer
  }
});
