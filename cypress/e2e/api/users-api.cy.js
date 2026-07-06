// ======================================================================
// users-api.cy.js
//
// Pruebas API usando cy.request().
// Aquí validamos endpoints REST sin interactuar con la UI.
// ======================================================================

describe("API Testing - JSONPlaceholder", () => {
    it("Debe obtener una lista de usuarios", () => {
        cy.request("GET", "https://jsonplaceholder.typicode.com/users").then(
            (response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("array");
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0]).to.have.property("email");
            },
        );
    });

    it("Debe obtener un usuario por ID", () => {
        cy.request("GET", "https://jsonplaceholder.typicode.com/users/1").then(
            (response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("id", 1);
                expect(response.body).to.have.property("name");
                expect(response.body).to.have.property("email");
            },
        );
    });

    it("Debe crear un usuario", () => {
        const newUser = {
            name: "Sergio Huayllas",
            username: "sergioqa",
            email: "sergio.qa@example.com",
        };

        cy.request(
            "POST",
            "https://jsonplaceholder.typicode.com/users",
            newUser,
        ).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("name", newUser.name);
            expect(response.body).to.have.property(
                "username",
                newUser.username,
            );
            expect(response.body).to.have.property("email", newUser.email);
            expect(response.body).to.have.property("id");
        });
    });
});
