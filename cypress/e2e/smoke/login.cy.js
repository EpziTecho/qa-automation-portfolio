import LoginPage from "../../pages/LoginPage";

describe("Login - SauceDemo", () => {
    beforeEach(() => {
        LoginPage.visit();
    });

    it("Debe cargar correctamente la página de login", () => {
        LoginPage.elements.title().should("contain", "Swag Labs");
    });

    it("Debe iniciar sesión con credenciales válidas", () => {
        cy.fixture("users").then((users) => {
            cy.login(users.validUser, users.password);
            cy.url().should("include", "/inventory.html");
            cy.get('[data-test="title"]').should("contain", "Products");
        });
    });

    it("Debe mostrar error cuando el usuario está bloqueado", () => {
        cy.fixture("users").then((users) => {
            LoginPage.login(users.lockedUser, users.password);
            LoginPage.elements
                .errorMessage()
                .should("be.visible")
                .and("contain", "locked out");
        });
    });

    it("Debe mostrar error con contraseña incorrecta", () => {
        cy.fixture("users").then((users) => {
            LoginPage.login(users.validUser, users.invalidPassword);
            LoginPage.elements
                .errorMessage()
                .should("be.visible")
                .and("contain", "Username and password do not match");
        });
    });

    it("Debe mostrar error cuando el usuario está vacío", () => {
        cy.fixture("users").then((users) => {
            LoginPage.typePassword(users.password);
            LoginPage.clickLogin();

            LoginPage.elements
                .errorMessage()
                .should("be.visible")
                .and("contain", "Username is required");
        });
    });

    it("Debe mostrar error cuando el password está vacío", () => {
        cy.fixture("users").then((users) => {
            LoginPage.typeUsername(users.validUser);
            LoginPage.clickLogin();

            LoginPage.elements
                .errorMessage()
                .should("be.visible")
                .and("contain", "Password is required");
        });
    });
});
