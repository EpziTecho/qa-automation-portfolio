class LoginPage {
    elements = {
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
        title: () => cy.get(".login_logo"),
    };

    visit() {
        cy.visit("/");
    }

    typeUsername(username) {
        this.elements.usernameInput().clear().type(username);
    }
    typePassword(password) {
        this.elements.passwordInput().clear().type(password);
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }
}

export default new LoginPage();
