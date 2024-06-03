const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');

module.exports = defineConfig({
  reporter: 'mochawesome', //try only mochawesome // cypress-mochawesome-reporter doesnt return json, prolly better?
  reporterOptions: {
    reportFilename: "[name]"
  },
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', verifyDownloadTasks);
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalStudio: true,
  },
  screenshotOnRunFailure: false
});
