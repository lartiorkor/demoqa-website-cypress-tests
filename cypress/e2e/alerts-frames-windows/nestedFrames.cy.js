describe("nested frames", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("nested iframes", () => {
    it("checks for contents of nested iframes", () => {
      cy.get("li#item-3.btn.btn-light").eq(1).click();
      cy.location("pathname").should("eq", "/nestedframes");
      cy.iframe("iframe#frame1")
        .contains("Parent frame")
        .within(() => {
          cy.iframe("iframe").contains("Child Iframe");
        });
    });
  });
});
