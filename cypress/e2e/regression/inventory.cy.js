import InventoryPage from "../../pages/InventoryPage";

describe("Inventory - SauceDemo", () => {
    // ------------------------------------------------------------------
    // beforeEach()
    //
    // Se ejecuta antes de cada test.
    // Como todos los tests de inventario requieren estar logueados,
    // hacemos login una vez antes de cada escenario.
    // ------------------------------------------------------------------

    beforeEach(() => {
        cy.loginAsStandardUser();
    });

    it("Debe mostrar la página de productos correctamente", () => {
        InventoryPage.elements.title().should("contain", "Products");

        // SauceDemo muestra 6 productos en la pantalla Inventory.
        InventoryPage.elements.inventoryItems().should("have.length", 6);
    });

    it("Debe mostrar nombres de productos visibles", () => {
        // each() recorre cada elemento encontrado por productNames().
        InventoryPage.elements.productNames().each(($productName) => {
            cy.wrap($productName).should("be.visible");
        });
    });

    it("Debe ordenar productos de A a Z", () => {
        InventoryPage.selectSortOption("az");

        InventoryPage.elements.productNames().then(($items) => {
            // $items es una colección tipo jQuery.
            // [...$items] la convierte en un array de JavaScript.
            const productNames = [...$items].map((item) => item.innerText);

            // Creamos una copia ordenada alfabéticamente.
            const sortedNames = [...productNames].sort();

            // Comparamos el orden real de la pantalla contra el orden esperado.
            expect(productNames).to.deep.equal(sortedNames);
        });
    });

    it("Debe ordenar productos de Z a A", () => {
        InventoryPage.selectSortOption("za");

        InventoryPage.elements.productNames().then(($items) => {
            const productNames = [...$items].map((item) => item.innerText);
            const sortedNames = [...productNames].sort().reverse();

            expect(productNames).to.deep.equal(sortedNames);
        });
    });

    it("Debe agregar un producto al carrito", () => {
        InventoryPage.addBackpackToCart();

        InventoryPage.elements.shoppingCartBadge().should("contain", "1");
        InventoryPage.elements.removeBackpackButton().should("be.visible");
    });

    it("Debe remover un producto del carrito", () => {
        InventoryPage.addBackpackToCart();
        InventoryPage.removeBackpackFromCart();

        InventoryPage.elements.shoppingCartBadge().should("not.exist");
        InventoryPage.elements.addBackpackButton().should("be.visible");
    });
});
