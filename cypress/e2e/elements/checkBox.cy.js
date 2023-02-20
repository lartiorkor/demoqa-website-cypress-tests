describe("", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(0).click();
    cy.location("pathname").should("eq", "/elements");
  });

  context("check box", () => {
    it("select check box", () => {
      cy.get("#item-1").click();
      cy.location("pathname").should("eq", "/checkbox");
      cy.get("button.rct-collapse.rct-collapse-btn").click();
      cy.get('[type="checkbox"]')
        .eq(1)
        .check({ force: true })
        .should("be.checked");
      cy.get("#result").should("exist");
    });
  });
});
