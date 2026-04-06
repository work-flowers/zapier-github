const { authentication, addAuthHeaders } = require('./authentication');
const listBranchesTrigger = require('./triggers/list_branches');
const retrieveCodeCreate = require('./creates/retrieve_code');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addAuthHeaders],
  triggers: {
    [listBranchesTrigger.key]: listBranchesTrigger,
  },
  creates: {
    [retrieveCodeCreate.key]: retrieveCodeCreate,
  },
};
