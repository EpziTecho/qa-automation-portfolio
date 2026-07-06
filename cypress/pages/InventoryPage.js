// ======================================================================
// InventoryPage.js
//
// Representa la página de productos de SauceDemo.
//
// Esta clase centraliza selectores y acciones de la pantalla Inventory.
// Así evitamos escribir selectores directamente en los tests.
// ======================================================================

class InventoryPage {
    // ------------------------------------------------------------------
    // elements
    //
    // Aquí guardamos los selectores de la página.
    // Cada propiedad es una función porque Cypress recomienda ejecutar
    // cy.get() en el momento exacto en que se necesita el elemento.
    // ------------------------------------------------------------------

    elements = {
        // Título superior de la página: "Products"
        title: () => cy.get('[data-test="title"]'),

        // Lista completa de productos visibles en inventario
        inventoryItems: () => cy.get('[data-test="inventory-item"]'),

        // Nombres de todos los productos
        productNames: () => cy.get('[data-test="inventory-item-name"]'),

        // Precios de todos los productos
        productPrices: () => cy.get('[data-test="inventory-item-price"]'),

        // Selector desplegable para ordenar productos
        sortDropdown: () => cy.get('[data-test="product-sort-container"]'),

        // Número que aparece en el carrito cuando agregamos productos
        shoppingCartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),

        // Ícono/link del carrito
        shoppingCartLink: () => cy.get('[data-test="shopping-cart-link"]'),

        // Botón específico para agregar Sauce Labs Backpack
        addBackpackButton: () =>
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]'),

        // Botón específico para remover Sauce Labs Backpack
        removeBackpackButton: () =>
            cy.get('[data-test="remove-sauce-labs-backpack"]'),
    };

    // ------------------------------------------------------------------
    // selectSortOption(option)
    //
    // Recibe el valor de ordenamiento:
    // "az"  -> Name A to Z
    // "za"  -> Name Z to A
    // "lohi" -> Price low to high
    // "hilo" -> Price high to low
    // ------------------------------------------------------------------

    selectSortOption(option) {
        this.elements.sortDropdown().select(option);
    }

    // Agrega el producto Backpack al carrito
    addBackpackToCart() {
        this.elements.addBackpackButton().click();
    }

    // Remueve el producto Backpack del carrito
    removeBackpackFromCart() {
        this.elements.removeBackpackButton().click();
    }

    // Abre la página del carrito
    goToCart() {
        this.elements.shoppingCartLink().click();
    }
}

// Exportamos una instancia lista para usar en los tests.
// Así podemos llamar InventoryPage.addBackpackToCart()
export default new InventoryPage();
