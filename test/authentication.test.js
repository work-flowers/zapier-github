const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('authentication', () => {
  it('should authenticate with a valid PAT', async () => {
    const bundle = {
      authData: {
        api_key: process.env.GITHUB_PAT,
        api_version: '2022-11-28',
      },
    };

    const result = await appTester(App.authentication.test, bundle);
    expect(result).toHaveProperty('login');
  });
});
