describe("check box", () => {
  context("check box", () => {
    it("select check box", () => {
      cy.visit("/checkbox");
      cy.get("button.rct-collapse.rct-collapse-btn").click();
      cy.get('[type="checkbox"]')
        .eq(1)
        .check({ force: true })
        .should("be.checked");
      cy.get("#result").should("exist");
    });
  });
});
