module.exports = {
  type: 'custom',
  test: {
    headers: {
      'X-API-KEY': '{{bundle.authData.api_key}}',
      'X-API-VERSION': '{{bundle.authData.api_version}}',
      Authorization: 'Bearer {{bundle.authData.api_key}}',
      'X-GitHub-Api-Version': '{{bundle.authData.api_version}}',
      Accept: 'application/vnd.github+json',
    },
    url: 'https://api.github.com/user',
  },
  fields: [
    {
      helpText:
        'See here to generate a Personal Access Token (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)',
      computed: false,
      key: 'api_key',
      required: true,
      label: 'Personal Access Token',
      type: 'password',
    },
    {
      default: '2022-11-28',
      helpText: 'Should be a date in YYYY-MM-DD format',
      computed: false,
      key: 'api_version',
      required: true,
      label: 'GitHub API Version',
      type: 'string',
    },
  ],
  customConfig: {},
};
