describe("radio button", () => {
  context("select radio button", () => {
    it("select radio button", () => {
      cy.visit("/radio-button");
      cy.get('[type="radio"]')
        .eq(0)
        .check({ force: true })
        .should("be.checked");
      cy.get("p.mt-3").should("exist");
    });
  });
});
