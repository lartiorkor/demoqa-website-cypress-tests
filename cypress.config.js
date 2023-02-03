const { defineConfig } = require("cypress");
//const { downloadFile } = require("cypress-dowloadfile/lib/addPlugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //on("task", { downloadfile });
    },
  },
});
