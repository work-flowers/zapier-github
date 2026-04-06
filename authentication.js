const authentication = {
  type: 'custom',
  test: {
    url: 'https://api.github.com/user',
  },
  fields: [
    {
      key: 'api_key',
      label: 'Personal Access Token',
      type: 'password',
      required: true,
      helpText:
        'Generate a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with the scopes needed for the repos you want to access.',
    },
    {
      key: 'api_version',
      label: 'GitHub API Version',
      type: 'string',
      required: true,
      default: '2022-11-28',
      helpText: 'GitHub API version in YYYY-MM-DD format.',
    },
  ],
  connectionLabel: '{{login}}',
};

const addAuthHeaders = (request, z, bundle) => {
  request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;
  request.headers['X-GitHub-Api-Version'] = bundle.authData.api_version;
  request.headers.Accept = 'application/vnd.github+json';
  return request;
};

module.exports = { authentication, addAuthHeaders };
