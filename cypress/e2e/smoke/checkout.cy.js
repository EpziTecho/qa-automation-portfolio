import InventoryPage from "../../pages/InventoryPage";
import CartPage from "../../pages/CartPage";
import CheckoutPage from "../../pages/CheckoutPage";

describe("Checkout - SauceDemo", () => {
    beforeEach(() => {
        cy.loginAsStandardUser();

        InventoryPage.addBackpackToCart();
        InventoryPage.goToCart();
        CartPage.goToCheckout();
    });

    it("Debe mostrar la página de información del checkout", () => {
        CheckoutPage.elements
            .title()
            .should("contain", "Checkout: Your Information");
    });

    it("Debe mostrar error cuando first name está vacío", () => {
        CheckoutPage.clickContinue();

        CheckoutPage.elements
            .errorMessage()
            .should("be.visible")
            .and("contain", "First Name is required");
    });

    it("Debe mostrar error cuando last name está vacío", () => {
        CheckoutPage.elements.firstNameInput().type("Sergio");
        CheckoutPage.clickContinue();

        CheckoutPage.elements
            .errorMessage()
            .should("be.visible")
            .and("contain", "Last Name is required");
    });

    it("Debe mostrar error cuando postal code está vacío", () => {
        CheckoutPage.elements.firstNameInput().type("Sergio");
        CheckoutPage.elements.lastNameInput().type("Huayllas");
        CheckoutPage.clickContinue();

        CheckoutPage.elements
            .errorMessage()
            .should("be.visible")
            .and("contain", "Postal Code is required");
    });

    it("Debe continuar al resumen con datos válidos", () => {
        cy.fixture("checkoutData").then((data) => {
            CheckoutPage.fillCheckoutInformation(
                data.firstName,
                data.lastName,
                data.postalCode,
            );
        });

        CheckoutPage.clickContinue();

        cy.url().should("include", "/checkout-step-two.html");
        CheckoutPage.elements.title().should("contain", "Checkout: Overview");
    });

    it("Debe finalizar una compra correctamente", () => {
        cy.fixture("checkoutData").then((data) => {
            CheckoutPage.fillCheckoutInformation(
                data.firstName,
                data.lastName,
                data.postalCode,
            );
        });

        CheckoutPage.clickContinue();
        CheckoutPage.clickFinish();

        CheckoutPage.elements
            .completeHeader()
            .should("contain", "Thank you for your order!");

        CheckoutPage.elements.completeText().should("be.visible");
    });

    it("Debe cancelar el checkout y volver al carrito", () => {
        CheckoutPage.clickCancel();

        cy.url().should("include", "/cart.html");
        CartPage.elements.title().should("contain", "Your Cart");
    });
});
