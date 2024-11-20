const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const fs = require("fs");
require('dotenv').config();

let lighthouseName;

module.exports = defineConfig({
  reporter: 'mochawesome', //try only mochawesome // cypress-mochawesome-reporter doesnt return json, prolly better?
  reporterOptions: {
    reportFilename: "[name]"
  },
  /*env: {
    DEV: {
      username: process.env.DEV_USER,
      password: process.env.DEV_PASS,
      url: process.env.DEV_URL,
    },
    PRE: {
      username: process.env.PRE_USER,
      password: process.env.PRE_PASS,
      url: process.env.PRE_URL
    },
    PRE_ADMIN: {
      username: process.env.PRE_USER_ADMIN,
      password: process.env.PRE_PASS_ADMIN,
      url: process.env.PRE_URL_ADMIN,
    }
  },*/
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      
      on('task', {
        setLighthouseName: (name) => {
          lighthouseName = name;
          return null
        },
        lighthouse: lighthouse(function(lighthouseReport) {
          console.log("---- Writing lighthouse report to disk ----");
          fs.writeFile(`reports/${lighthouseName}.html`, lighthouseReport.report, (error) => {
            error ? console.log(error) : console.log("Report created successfully");
          });
          return lighthouseReport
        }),
      });
      on('task', verifyDownloadTasks)
      
      const envConfig = {
        DEV: {
          username: process.env.DEV_USER,
          password: process.env.DEV_PASS,
          url: process.env.DEV_URL,
        },
        PRE: {
          username: process.env.PRE_USER,
          password: process.env.PRE_PASS,
          url: process.env.PRE_URL
        },
        PRE_ADMIN: {
          username: process.env.PRE_USER_ADMIN,
          password: process.env.PRE_PASS_ADMIN,
          url: process.env.PRE_URL_ADMIN,
        }
      }

      const checkEnv = config.env.envSet
      const activeEnv = checkEnv || 'PRE_ADMIN'

      console.log(`Using environment set: ${activeEnv}`);

      config.env = {
        ...config.env,
        ...envConfig[activeEnv]
      }

      config.env.DEV_USER = process.env.DEV_USER;
      config.env.DEV_PASS = process.env.DEV_PASS;
      config.env.DEV_URL = process.env.DEV_URL;

      config.env.PRE_USER = process.env.PRE_USER;
      config.env.PRE_PASS = process.env.PRE_PASS;
      config.env.PRE_URL = process.env.PRE_URL;
      config.env.PRE_USER_ADMIN = process.env.PRE_USER_ADMIN;
      config.env.PRE_PASS_ADMIN = process.env.PRE_PASS_ADMIN;


      return config;
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalStudio: true,
  },
  screenshotOnRunFailure: false
});
