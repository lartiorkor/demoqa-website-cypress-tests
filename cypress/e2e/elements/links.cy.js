describe("links", () => {
  beforeEach(() => {
    cy.visit("/links");
  });

  context("links", () => {
    it("target: blank", () => {
      cy.get("#simpleLink").should("have.attr", "target", "_blank").click();
      cy.get("#dynamicLink").should("have.attr", "target", "_blank").click();
    });

    it("target: self", () => {
      cy.get("#item-5").click();
      cy.location("pathname").should("eq", "/links");
      cy.get("#created").click();
      cy.get("#linkResponse").should("exist");
      cy.get("#no-content").click();
      cy.get("#linkResponse").should("exist");
      cy.get("#moved").click();
      cy.get("#linkResponse").should("exist");
      cy.get("#bad-request").click();
      cy.get("#linkResponse").should("exist");
      cy.get("#unauthorized").click();
      cy.get("#linkResponse").should("exist");
      cy.get("#forbidden").click();
      cy.get("#linkResponse").should("exist");
      cy.get("#invalid-url").click();
      cy.get("#linkResponse").should("exist");
    });
  });
});
