const { authentication, addAuthHeaders } = require('./authentication');
const listReposTrigger = require('./triggers/list_repos');
const listBranchesTrigger = require('./triggers/list_branches');
const listFilesTrigger = require('./triggers/list_files');
const retrieveCodeCreate = require('./creates/retrieve_code');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addAuthHeaders],
  triggers: {
    [listReposTrigger.key]: listReposTrigger,
    [listBranchesTrigger.key]: listBranchesTrigger,
    [listFilesTrigger.key]: listFilesTrigger,
  },
  creates: {
    [retrieveCodeCreate.key]: retrieveCodeCreate,
  },
};
