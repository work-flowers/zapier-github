const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('triggers.list_repos', () => {
  it('should list repos for a user', async () => {
    const bundle = {
      authData: {
        api_key: process.env.GITHUB_PAT,
        api_version: '2022-11-28',
      },
      inputData: {
        owner: 'octocat',
      },
    };

    const results = await appTester(
      App.triggers.list_repos.operation.perform,
      bundle
    );

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('id');
    expect(results[0]).toHaveProperty('name');
  });
});
