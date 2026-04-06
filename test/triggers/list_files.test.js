const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('triggers.list_files', () => {
  it('should list files in a repo', async () => {
    const bundle = {
      authData: {
        api_key: process.env.GITHUB_PAT,
        api_version: '2022-11-28',
      },
      inputData: {
        owner: 'octocat',
        repo: 'Hello-World',
        branch: 'master',
      },
    };

    const results = await appTester(
      App.triggers.list_files.operation.perform,
      bundle
    );

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('id');
    expect(results[0]).toHaveProperty('name');
    // Should be file paths like "README"
    expect(results.some((f) => f.id === 'README')).toBe(true);
  });
});
