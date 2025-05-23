const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://salahub.ninja',
    supportFile: 'cypress/support/e2e.js', // Enable support file
    video: false, // Enable video recording
    videoCompression: 32, // Compression quality (lower = smaller file size)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
