orion.attributes.registerAttribute('users-roles', {
  template: 'orionAttributesHasMany',
  previewTemplate: 'orionAttributesHasManyColumn',
  getSchema: function(options) {
    check(options.publicationName, String);
    check(options.roles, [String]);

    if (Meteor.isServer) {
      Meteor.publishComposite(options.publicationName, {
        find: function() {
          return Roles._collection.find({ roles: { $in: options.roles } });
        },
        children: [{
          find: function(role) {
            return Meteor.users.find({ _id: role.userId }, { fields: { 'profile.name': 1, 'emails.address': 1 } });
          }
        }]
      });
    }

    options = _.extend(options, {
      titleField: 'profile.name',
      pluralName: i18n('attributes.users.pluralName'),
      singularName: i18n('attributes.users.singularName'),
      collection: Meteor.users,
      customPublication: true,
      filter: function() {
        var usersIds = _.pluck(Roles._collection.find({ roles: { $in: options.roles } }).fetch(), 'userId');
        return { _id: { $in: usersIds } };
      },
      additionalFields: ['emails.address', 'roles'],
      render: {
        item: function(item, escape) {
          return '<div class="usersAttribute">' +
            (item['profile.name'] ? '<span class="name">' + escape(item['profile.name']) + '</span>' : '') +
            item.roles().map(function(role) {
              return '<span class="role">' + role + '</span>';
            }).join('') +
            (item['emails.address'] ? '<span class="email">' + escape(item['emails.address']) + '</span>' : '') +
          '</div>';
        },
        option: function(item, escape) {
          var label = item['profile.name'] || item['emails.address'];
          var caption = item['profile.name'] ? item['emails.address'] : null;
          return '<div class="usersAttribute">' +
            '<span class="name">' + escape(label) + '</span>' +
            item.roles().map(function(role) {
              return '<span class="role">' + role + '</span>';
            }).join('') +
            (caption ? '<span class="email">' + escape(caption) + '</span>' : '') +
          '</div>';
        }
      },
    });
    return orion.attribute('hasMany', {}, options);
  },
  valueOut: function() {
    return this.val();
  }
});

orion.attributes.registerAttribute('user-roles', {
  template: 'orionAttributesHasOne',
  previewTemplate: 'orionAttributesHasOneColumn',
  getSchema: function(options) {
    check(options.publicationName, String);
    check(options.roles, [String]);

    if (Meteor.isServer) {
      Meteor.publishComposite(options.publicationName, {
        find: function() {
          return Roles._collection.find({ roles: { $in: options.roles } });
        },
        children: [{
          find: function(role) {
            return Meteor.users.find({ _id: role.userId }, { fields: { 'profile.name': 1, 'emails.address': 1 } });
          }
        }]
      });
    }

    options = _.extend(options, {
      titleField: 'profile.name',
      collection: Meteor.users,
      filter: function() {
        var usersIds = _.pluck(Roles._collection.find({ roles: { $in: options.roles } }).fetch(), 'userId');
        return { _id: { $in: usersIds } };
      },
      additionalFields: ['emails.address', 'roles'],
      customPublication: true,
      render: {
        item: function(item, escape) {
          return '<div class="usersAttribute">' +
            (item['profile.name'] ? '<span class="name">' + escape(item['profile.name']) + '</span>' : '') +
            item.roles().map(function(role) {
              return '<span class="role">' + role + '</span>';
            }).join('') +
            (item['emails.address'] ? '<span class="email">' + escape(item['emails.address']) + '</span>' : '') +
          '</div>';
        },
        option: function(item, escape) {
          var label = item['profile.name'] || item['emails.address'];
          var caption = item['profile.name'] ? item['emails.address'] : null;
          return '<div class="usersAttribute">' +
            '<span class="name">' + escape(label) + '</span>' +
            item.roles().map(function(role) {
              return '<span class="role">' + role + '</span>';
            }).join('') +
            (caption ? '<span class="email">' + escape(caption) + '</span>' : '') +
          '</div>';
        }
      },
    });
    return orion.attribute('hasOne', {}, options);
  },
  valueOut: function() {
    return this.val();
  }
});
