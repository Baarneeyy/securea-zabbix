const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');
require('dotenv').config();


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
      
      config.env.DEV_USER = process.env.DEV_USER;
      config.env.DEV_PASS = process.env.DEV_PASS;
      config.env.DEV_URL = process.env.DEV_URL;

      config.env.PRE_USER = process.env.PRE_USER;
      config.env.PRE_PASS = process.env.PRE_PASS;
      config.env.PRE_URL = process.env.PRE_URL;

      return config;
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalStudio: true,
  },
  screenshotOnRunFailure: false
});
