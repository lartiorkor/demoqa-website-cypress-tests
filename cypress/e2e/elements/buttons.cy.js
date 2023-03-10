describe("buttons", () => {
  context("button", () => {
    it("clicks button", () => {
      cy.visit("/buttons");
      cy.get("#doubleClickBtn").contains("Double Click Me").dblclick();
      cy.get("#doubleClickMessage").should("exist");
      cy.get("#rightClickBtn").contains("Right Click Me").rightclick();
      cy.get("#rightClickMessage").should("exist");
      cy.get("button.btn.btn-primary").eq(2).contains("Click Me").click();
      cy.get("#dynamicClickMessage").should("exist");
    });
  });
});
