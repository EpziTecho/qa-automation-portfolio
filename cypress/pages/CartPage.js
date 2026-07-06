// ======================================================================
// CartPage.js
//
// Representa la página del carrito de compras.
//
// Aquí centralizamos los selectores y acciones propias del carrito.
// ======================================================================

class CartPage {
    elements = {
        // Título de la pantalla del carrito: "Your Cart"
        title: () => cy.get('[data-test="title"]'),

        // Lista de productos agregados al carrito
        cartItems: () => cy.get('[data-test="inventory-item"]'),

        // Nombre del producto dentro del carrito
        itemName: () => cy.get('[data-test="inventory-item-name"]'),

        // Precio del producto dentro del carrito
        itemPrice: () => cy.get('[data-test="inventory-item-price"]'),

        // Botón para remover Backpack desde el carrito
        removeBackpackButton: () =>
            cy.get('[data-test="remove-sauce-labs-backpack"]'),

        // Botón para volver al inventario
        continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),

        // Botón para avanzar al checkout
        checkoutButton: () => cy.get('[data-test="checkout"]'),
    };

    removeBackpack() {
        this.elements.removeBackpackButton().click();
    }

    continueShopping() {
        this.elements.continueShoppingButton().click();
    }

    goToCheckout() {
        this.elements.checkoutButton().click();
    }
}

export default new CartPage();
