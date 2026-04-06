const authentication = require('./authentication');
const retrieveCodeCreate = require('./creates/retrieve_code.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  requestTemplate: {
    params: {
      api_key: '{{bundle.authData.api_key}}',
      api_version: '{{bundle.authData.api_version}}',
    },
    headers: {
      'X-API-KEY': '{{bundle.authData.api_key}}',
      'X-API-VERSION': '{{bundle.authData.api_version}}',
    },
  },
  creates: { [retrieveCodeCreate.key]: retrieveCodeCreate },
};
