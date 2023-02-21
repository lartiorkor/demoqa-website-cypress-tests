const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //on("task", { downloadfile });
    },
    baseUrl: "https://demoqa.com/",
  },
});
