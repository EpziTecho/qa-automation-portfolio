const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
    e2e: {
        // Tomamos la URL desde cypress.env.json.
        // Esto permite cambiar de ambiente sin tocar el código de los tests.
        baseUrl: process.env.CYPRESS_BASE_URL || "https://www.saucedemo.com",

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
