// ======================================================================
// commands.js
//
// Aquí creamos comandos personalizados de Cypress.
//
// Un Custom Command permite extender el objeto cy.
// Por ejemplo, en lugar de repetir todo el flujo de login:
//
// cy.visit('/')
// cy.get(...).type(...)
// cy.get(...).click()
//
// podremos usar:
//
// cy.login(username, password)
//
// Esto hace que los tests sean más limpios, reutilizables y mantenibles.
// ======================================================================

import LoginPage from "../pages/LoginPage";

// ----------------------------------------------------------------------
// cy.login(username, password)
//
// Este comando recibe usuario y contraseña.
// Internamente usa el Page Object LoginPage.
// Así mantenemos los selectores centralizados en LoginPage.js.
// ----------------------------------------------------------------------

Cypress.Commands.add("login", (username, password) => {
    LoginPage.visit();
    LoginPage.login(username, password);
});
// Login específico para el usuario estándar.
// Evita repetir cy.fixture('users') en varios specs.
Cypress.Commands.add("loginAsStandardUser", () => {
    cy.fixture("users").then((users) => {
        cy.login(users.validUser, users.password);
    });
});
