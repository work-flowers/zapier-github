const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('creates.retrieve_code', () => {
  const authData = {
    api_key: process.env.GITHUB_PAT,
    api_version: '2022-11-28',
  };

  it('should retrieve a file from the master branch', async () => {
    const bundle = {
      authData,
      inputData: {
        owner: 'octocat',
        repo: 'Hello-World',
        branch: 'master',
        file_path: 'README',
      },
    };

    const result = await appTester(
      App.creates.retrieve_code.operation.perform,
      bundle
    );

    expect(result).toHaveProperty('content');
    expect(result.content.length).toBeGreaterThan(0);
    expect(result.ref).toBe('master');
  });

  it('should retrieve a file from a specific branch', async () => {
    const bundle = {
      authData,
      inputData: {
        owner: 'octocat',
        repo: 'Hello-World',
        branch: 'test',
        file_path: 'README',
      },
    };

    const result = await appTester(
      App.creates.retrieve_code.operation.perform,
      bundle
    );

    expect(result).toHaveProperty('content');
    expect(result.ref).toBe('test');
  });

  it('should use ref override when both branch and ref are provided', async () => {
    const bundle = {
      authData,
      inputData: {
        owner: 'octocat',
        repo: 'Hello-World',
        branch: 'test',
        ref: 'master',
        file_path: 'README',
      },
    };

    const result = await appTester(
      App.creates.retrieve_code.operation.perform,
      bundle
    );

    expect(result.ref).toBe('master');
  });
});
