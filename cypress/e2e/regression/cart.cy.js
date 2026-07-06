import InventoryPage from "../../pages/InventoryPage";
import CartPage from "../../pages/CartPage";

describe("Cart - SauceDemo", () => {
    // Antes de cada prueba iniciamos sesión.
    // Luego agregamos Backpack y entramos al carrito.
    // Así cada test empieza desde un estado conocido.
    beforeEach(() => {
        cy.fixture("users").then((users) => {
            cy.login(users.validUser, users.password);
        });

        InventoryPage.addBackpackToCart();
        InventoryPage.goToCart();
    });

    it("Debe mostrar la página del carrito correctamente", () => {
        CartPage.elements.title().should("contain", "Your Cart");
    });

    it("Debe mostrar el producto agregado en el carrito", () => {
        CartPage.elements.cartItems().should("have.length", 1);
        CartPage.elements.itemName().should("contain", "Sauce Labs Backpack");
        CartPage.elements.itemPrice().should("contain", "$29.99");
    });

    it("Debe remover un producto desde el carrito", () => {
        CartPage.removeBackpack();

        // Validamos que ya no existan productos en el carrito.
        CartPage.elements.cartItems().should("not.exist");
    });

    it("Debe permitir continuar comprando", () => {
        CartPage.continueShopping();

        // Al volver al inventario, el título debe ser Products.
        InventoryPage.elements.title().should("contain", "Products");
    });

    it("Debe redirigir al checkout", () => {
        CartPage.goToCheckout();

        cy.url().should("include", "/checkout-step-one.html");
    });
});
