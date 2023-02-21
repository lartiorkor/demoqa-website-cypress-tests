describe("frames", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
    cy.get("li#item-2.btn.btn-light").eq(1).click();
    cy.location("pathname").should("eq", "/frames");
  });

  context("checking iframes", () => {
    it("checks large iframe content", () => {
      cy.iframe("iframe#frame1")
        .find("h1#sampleHeading")
        .contains("This is a sample page");
    });
    it("checks small iframe content", () => {
      cy.get("#frame2Wrapper")
        .iframe("#frame2")
        .find("h1#sampleHeading")
        .contains("This is a sample page");
    });
  });
});
