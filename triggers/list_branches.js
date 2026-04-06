const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api.github.com/repos/${bundle.inputData.owner}/${bundle.inputData.repo}/branches`,
    params: {
      per_page: 100,
    },
  });

  return response.data.map((branch) => ({
    id: branch.name,
    name: branch.name,
  }));
};

module.exports = {
  key: 'list_branches',
  noun: 'Branch',
  display: {
    label: 'List Branches',
    description: 'Hidden trigger that powers the branch dropdown.',
    hidden: true,
  },
  operation: {
    perform,
    inputFields: [
      { key: 'owner', label: 'Owner', type: 'string', required: true },
      { key: 'repo', label: 'Repository', type: 'string', required: true },
    ],
    sample: { id: 'main', name: 'main' },
    outputFields: [
      { key: 'id', label: 'Branch Name', type: 'string' },
      { key: 'name', label: 'Branch Name', type: 'string' },
    ],
  },
};
