Orion Users With Roles Attribute
================================

```
nicolaslopezj:orion-users-with-roles-attribute
```

## Examples

#### Users with roles

```js
Groups = new Mongo.Collection('groups');

Groups.attachSchema(new SimpleSchema({
  adminsIds: orion.attribute('users-roles', {
    label: 'Admins',
    optional: true
  }, {
    publicationName: 'groups_adminsIds_schema', // any string here
    roles: ['admin']
  })
}));
```

#### User with roles

```js
Groups = new Mongo.Collection('groups');

Groups.attachSchema(new SimpleSchema({
  adminIds: orion.attribute('user-roles', {
    label: 'Admin',
    optional: true
  }, {
    publicationName: 'groups_adminIds_schema', // any string here
    roles: ['admin']
  })
}));
```

### Roles 2.0

There is no need to use this package if you are using nicolaslopezj:roles@2.0, just use the users attribute.

```js
Groups.attachSchema(new SimpleSchema({
  adminId: orion.attribute('user', {
    label: 'Admin'
  }, {
    publicationName: 'anyUniqueStringHere',
    additionalFields: ['roles'],
    filter: function() {
      return { roles: 'admin' }; // or { roles: { $in: ['admin', 'editor'] } }
    }
  })
}));
```
