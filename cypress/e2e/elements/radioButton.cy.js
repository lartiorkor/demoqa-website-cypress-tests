describe("radio button", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(0).click();
    cy.location("pathname").should("eq", "/elements");
  });

  context("select radio button", () => {
    it("select radio button", () => {
      cy.get("#item-2").click();
      cy.location("pathname").should("eq", "/radio-button");
      cy.get('[type="radio"]')
        .eq(0)
        .check({ force: true })
        .should("be.checked");
      cy.get("p.mt-3").should("exist");
    });
  });
});
