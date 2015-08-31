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
