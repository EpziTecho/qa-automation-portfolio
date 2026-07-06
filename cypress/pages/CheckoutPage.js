// ======================================================================
// CheckoutPage.js
//
// Representa las pantallas de checkout de SauceDemo.
//
// El checkout tiene varias etapas:
// 1. Información del comprador
// 2. Resumen de compra
// 3. Confirmación final
// ======================================================================

class CheckoutPage {
    elements = {
        title: () => cy.get('[data-test="title"]'),

        firstNameInput: () => cy.get('[data-test="firstName"]'),
        lastNameInput: () => cy.get('[data-test="lastName"]'),
        postalCodeInput: () => cy.get('[data-test="postalCode"]'),

        continueButton: () => cy.get('[data-test="continue"]'),
        cancelButton: () => cy.get('[data-test="cancel"]'),
        finishButton: () => cy.get('[data-test="finish"]'),

        errorMessage: () => cy.get('[data-test="error"]'),

        summaryInfo: () => cy.get('[data-test="checkout-summary-container"]'),
        completeHeader: () => cy.get('[data-test="complete-header"]'),
        completeText: () => cy.get('[data-test="complete-text"]'),
    };

    fillCheckoutInformation(firstName, lastName, postalCode) {
        this.elements.firstNameInput().clear().type(firstName);
        this.elements.lastNameInput().clear().type(lastName);
        this.elements.postalCodeInput().clear().type(postalCode);
    }

    clickContinue() {
        this.elements.continueButton().click();
    }

    clickCancel() {
        this.elements.cancelButton().click();
    }

    clickFinish() {
        this.elements.finishButton().click();
    }
}

export default new CheckoutPage();
