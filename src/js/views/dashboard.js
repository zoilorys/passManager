define(['backbone', '../models/passwords'], (bb, collection) => {
  const AddListEntry = Backbone.View.extend({
    template: _.template($('#list-add-item').html()),

    render: function() {
      this.el.innerHTML = this.template();

      return this;
    },

    events: {
      'click button.add-entry-button': 'addEntry'
    },

    addEntry: function() {
      let entry = {
        name: this.$('input[name="login"]').val(),
        password: this.$('input[name="password"]').val()
      };

      collection.create(entry, {
        silent: true,
        wait: true,
        success: function(coll, response) {
          collection.trigger('update');
        }
      });
      this.$('input[name="login"]').val('');
      this.$('input[name="password"]').val('')
    }
  });

  const ListEntry = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#list-entry').html()),
    render: function() {
      var model = this.model.toJSON();
      model.showPassword = this.showPassword;
      this.el.innerHTML = this.template(model);
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
      let model = this.model.toJSON();
      model.password = this.$('input').val();
      collection.set(model, {remove: false});
      collection.get(model.id).save();
      this.render();
    }
  });

  const ListContainer = Backbone.View.extend({
    tagName: 'table',
    className: 'table table-striped table-hover',
    template: _.template($('#list-container').html()),

    initialize: function() {
      collection.on('update', () => {
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
      collection.get(id).destroy();
      this.render();
    }
  });

  return {
    AddListEntry,
    ListEntry,
    ListContainer
  }
});
