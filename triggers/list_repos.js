const perform = async (z, bundle) => {
  const owner = bundle.inputData.owner;

  // Get the authenticated user's login to decide which endpoint to use
  const meResponse = await z.request({ url: 'https://api.github.com/user' });
  const authenticatedUser = meResponse.data.login;

  let response;
  if (owner.toLowerCase() === authenticatedUser.toLowerCase()) {
    // Authenticated user — /user/repos includes private repos
    response = await z.request({
      url: 'https://api.github.com/user/repos',
      params: { per_page: 100, sort: 'full_name', affiliation: 'owner' },
    });
  } else {
    // For orgs, use /user/repos with the org as affiliation owner
    // This returns all repos (including private) the authenticated user can access
    response = await z.request({
      url: 'https://api.github.com/user/repos',
      params: { per_page: 100, sort: 'full_name', affiliation: 'organization_member' },
    });
    // Filter to only repos belonging to the specified owner
    response.data = response.data.filter(
      (repo) => repo.owner.login.toLowerCase() === owner.toLowerCase()
    );
  }

  return response.data.map((repo) => ({
    id: repo.name,
    name: repo.full_name,
  }));
};

module.exports = {
  key: 'list_repos',
  noun: 'Repository',
  display: {
    label: 'List Repositories',
    description: 'Hidden trigger that powers the repository dropdown.',
    hidden: true,
  },
  operation: {
    perform,
    inputFields: [
      { key: 'owner', label: 'Owner', type: 'string', required: true },
    ],
    sample: { id: 'Hello-World', name: 'octocat/Hello-World' },
    outputFields: [
      { key: 'id', label: 'Repository Name', type: 'string' },
      { key: 'name', label: 'Full Name', type: 'string' },
    ],
  },
};
