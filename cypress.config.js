const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'accqcn',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
