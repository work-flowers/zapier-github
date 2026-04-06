const perform = async (z, bundle) => {
  const { owner, repo } = bundle.inputData;
  const ref = bundle.inputData.ref || bundle.inputData.branch || 'main';

  // Use the Git Trees API with recursive flag to get all files
  const response = await z.request({
    url: `https://api.github.com/repos/${owner}/${repo}/git/trees/${ref}`,
    params: { recursive: '1' },
  });

  return response.data.tree
    .filter((item) => item.type === 'blob')
    .map((item) => ({
      id: item.path,
      name: item.path,
    }));
};

module.exports = {
  key: 'list_files',
  noun: 'File',
  display: {
    label: 'List Files',
    description: 'Hidden trigger that powers the file path dropdown.',
    hidden: true,
  },
  operation: {
    perform,
    inputFields: [
      { key: 'owner', label: 'Owner', type: 'string', required: true },
      { key: 'repo', label: 'Repository', type: 'string', required: true },
      { key: 'branch', label: 'Branch', type: 'string', required: false },
      { key: 'ref', label: 'Ref', type: 'string', required: false },
    ],
    sample: { id: 'src/index.js', name: 'src/index.js' },
    outputFields: [
      { key: 'id', label: 'File Path', type: 'string' },
      { key: 'name', label: 'File Path', type: 'string' },
    ],
  },
};
