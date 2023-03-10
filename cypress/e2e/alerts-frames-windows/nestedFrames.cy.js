describe("nested frames", () => {
  context("nested iframes", () => {
    it("checks for contents of nested iframes", () => {
      cy.visit("/nestedframes");
      cy.iframe("iframe#frame1")
        .contains("Parent frame")
        .within(() => {
          cy.iframe("iframe").contains("Child Iframe");
        });
    });
  });
});
