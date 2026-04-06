const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('triggers.list_branches', () => {
  it('should list branches for a repo', async () => {
    const bundle = {
      authData: {
        api_key: process.env.GITHUB_PAT,
        api_version: '2022-11-28',
      },
      inputData: {
        owner: 'octocat',
        repo: 'Hello-World',
      },
    };

    const results = await appTester(
      App.triggers.list_branches.operation.perform,
      bundle
    );

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('id');
    expect(results[0]).toHaveProperty('name');
  });
});
