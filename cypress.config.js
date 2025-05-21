const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://salahub.ninja',
    supportFile: false,
    video: true, // Enable video recording
    videoCompression: 32, // Compression quality (lower = smaller file size)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
