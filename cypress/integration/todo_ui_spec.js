describe("UI tests for Todo App", () => {
    it("Should visit starting page for app", () => {
        cy.visit("http://localhost:8000")

        cy.url().should("include", "/");
        
    })

    it("Should add a todo item and then delete it", () => {
        cy.get("input").type("Test").should("have.value", "Test");
        cy.contains("Lägg till").click();

        cy.contains("Redigera").click();
        cy.url().should("include", "/edit");
        cy.get("input").type("Hej").should("have.value", "Hej");
        cy.contains("Redigera").click();

        cy.contains("complete").click();

        cy.get(".delete").each(() => {
            cy.get(".delete").first().click()
        })
    })
})