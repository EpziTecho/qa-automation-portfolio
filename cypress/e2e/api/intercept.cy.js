// ======================================================================
// intercept.cy.js
//
// cy.intercept() permite observar, esperar o modificar peticiones HTTP
// que realiza una aplicación web.
//
// En pruebas reales se usa para:
// - validar llamadas al backend;
// - esperar respuestas antes de hacer assertions;
// - simular respuestas del servidor;
// - probar errores como 500, 404, timeout, etc.
// ======================================================================

// Este ejemplo usa una página pública que consume una API.
// Interceptamos la llamada desde el navegador.
// ======================================================================

describe("Intercept UI Requests", () => {
    it("Debe interceptar una respuesta de API desde la UI", () => {
        cy.intercept("GET", "**/posts").as("getPosts");

        cy.visit("https://jsonplaceholder.typicode.com/");

        cy.contains("/posts").click();

        cy.wait("@getPosts").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.be.an("array");
        });
    });
});
