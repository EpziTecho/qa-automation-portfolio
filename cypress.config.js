const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
module.exports = defineConfig({
    e2e: {
        baseUrl: "https://www.saucedemo.com",
        viewportWidth: 1366,
        viewportHeight: 768,
        video: false,
        screenshotOnRunFailure: true,

        setupNodeEvents(on, config) {
            allureCypress(on, config);
            return config;
        },
    },
});
