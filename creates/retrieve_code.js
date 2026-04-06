const perform = async (z, bundle) => {
  // ref takes precedence over branch; default to main if neither provided
  const ref = bundle.inputData.ref || bundle.inputData.branch || 'main';

  const response = await z.request({
    url: `https://api.github.com/repos/${bundle.inputData.owner}/${bundle.inputData.repo}/contents/${bundle.inputData.file_path}`,
    headers: {
      Accept: 'application/vnd.github.v3.raw',
    },
    params: { ref },
    raw: true,
  });

  const content = await response.text();
  return { content, ref };
};

module.exports = {
  key: 'retrieve_code',
  noun: 'Code',
  display: {
    label: 'Retrieve Code',
    description: 'Returns the code from a file at a provided path.',
  },
  operation: {
    perform,
    inputFields: [
      {
        key: 'owner',
        label: 'Owner Name',
        type: 'string',
        required: true,
        helpText: 'User name or organization name that owns the repository.',
        altersDynamicFields: true,
      },
      {
        key: 'repo',
        label: 'Repository',
        type: 'string',
        required: true,
        helpText: 'Name of the repository where the file is stored.',
        dynamic: 'list_repos.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'branch',
        label: 'Branch',
        type: 'string',
        required: false,
        helpText: 'Branch to retrieve the file from. Defaults to main.',
        dynamic: 'list_branches.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'ref',
        label: 'Ref Override',
        type: 'string',
        required: false,
        helpText:
          'A commit SHA or tag to retrieve the file from. If provided, this overrides the Branch field.',
      },
      {
        key: 'file_path',
        label: 'File Path',
        type: 'string',
        required: true,
        helpText: 'Path to the file you want to retrieve, e.g., src/index.js',
        dynamic: 'list_files.id.name',
      },
    ],
    sample: {
      content: 'console.log("hello world");',
      ref: 'main',
    },
    outputFields: [
      { key: 'content', label: 'File Content', type: 'string' },
      { key: 'ref', label: 'Ref Used', type: 'string' },
    ],
  },
};
