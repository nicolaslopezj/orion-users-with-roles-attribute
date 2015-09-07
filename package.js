Package.describe({
  name: 'nicolaslopezj:orion-users-with-roles-attribute',
  summary: 'Users attribute with roles filter',
  version: '1.0.1',
  git: 'https://github.com/nicolaslopezj/orion-users-with-roles-attribute'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.4.2',
    'reywood:publish-composite@1.4.2',
    'nicolaslopezj:roles@1.3.1',
    'orionjs:relationships@1.4.3'
    ]);

  api.addFiles('attribute.js');
  api.addFiles('styles.css', 'client');
});

Package.onTest(function(api) {
});
