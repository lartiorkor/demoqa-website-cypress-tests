describe("", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("nested frames", () => {
    it("checks for contents of nested iframes", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-3").click();
      cy.location("pathname").should("eq", "/nestedframes");
      cy.iframe("iframe#frame1")
        .contains("Parent frame")
        .within(() => {
          cy.iframe("iframe").contains("Child Iframe");
        });
    });
  });
});
