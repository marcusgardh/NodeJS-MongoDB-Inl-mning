describe("About page", () => {
    it("Should load about page", () => {
        cy.visit("http://localhost:8000");

        cy.contains("About").click();

        cy.url().should("include", "/about");

        cy.contains("Den här Att göra-appen är gjord av Marcus Gårdh.");
    })
})