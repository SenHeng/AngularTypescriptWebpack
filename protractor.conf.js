exports.config = {
  frame: 'mocha',
  capabilities: {
    browserName: 'chrome',
  },
  specs: ['test/**/*.spec.ts'],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  beforeLaunch: () => {
    require('ts-node').register({
      project: 'tsconfig.json'
    });
  },
};
