describe("buttons", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("div.card.mt-4.top-card").eq(0).click();
    cy.location("pathname").should("eq", "/elements");
  });

  context("button", () => {
    it("clicks button", () => {
      cy.get("#item-4").click();
      cy.location("pathname").should("eq", "/buttons");
      cy.get("#doubleClickBtn").contains("Double Click Me").dblclick();
      cy.get("#doubleClickMessage").should("exist");
      cy.get("#rightClickBtn").contains("Right Click Me").rightclick();
      cy.get("#rightClickMessage").should("exist");
      cy.get("button.btn.btn-primary").eq(2).contains("Click Me").click();
      cy.get("#dynamicClickMessage").should("exist");
    });
  });
});
