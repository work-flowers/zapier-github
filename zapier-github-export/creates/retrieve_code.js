const perform = async (z, bundle) => {
  const options = {
    url: `https://api.github.com/repos/${bundle.inputData.owner}/${bundle.inputData.repo}/contents/${bundle.inputData.file_path}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.api_key}`,
      Accept: 'application/vnd.github.v3.raw',
    },
    params: {
      ref: 'main',
    },
    raw: true, // tells Zapier to return raw data (not JSON)
  };

  return z.request(options).then((response) => {
    return response.text().then((text) => {
      return { content: text };
    });
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'owner',
        label: 'Owner Name',
        type: 'string',
        helpText:
          'User name or organization name of the owner of the code file',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'repo',
        label: 'Repository',
        type: 'string',
        helpText: 'Name of the repository where the file is stored',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'file_path',
        label: 'File Path',
        type: 'string',
        helpText: 'Path to the file you want to retrive, e.g., test.sql',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    outputFields: [{ key: 'Content', label: 'content', type: 'string' }],
  },
  display: {
    description: 'Returns the code from a file at a provided path',
    hidden: false,
    label: 'Retrieve Code',
  },
  key: 'retrieve_code',
  noun: 'code',
};
