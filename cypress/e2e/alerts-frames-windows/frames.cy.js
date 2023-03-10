describe("frames", () => {
  beforeEach(() => {
    cy.visit("/frames");
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
