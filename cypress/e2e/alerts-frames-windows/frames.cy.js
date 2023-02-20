describe("frames", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("checking iframes", () => {
    it("checks large iframe content", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-2").click();
      cy.location("pathname").should("eq", "/frames");
      cy.iframe("iframe#frame1")
        .find("h1#sampleHeading")
        .contains("This is a sample page");
    });
    it("checks small iframe content", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-2").click();
      cy.location("pathname").should("eq", "/frames");
      cy.get("#frame2Wrapper")
        .iframe("#frame2")
        .find("h1#sampleHeading")
        .contains("This is a sample page");
    });
  });
});
