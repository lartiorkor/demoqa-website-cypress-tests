describe("text box", () => {
  beforeEach(() => {
    cy.visit("/text-box");
  });

  context("user registration", () => {
    it("valid user credentials", () => {
      cy.randomFullNameGenerator("#userName");
      cy.randomEmailGenerator("#userEmail");
      cy.randomAddressGenerator("#currentAddress");
      cy.randomAddressGenerator("#permanentAddress");
      cy.get("#submit").click().should("exist");
      cy.get("#output").should("exist");
      cy.get("#name").should("exist");
      cy.get("#email").should("exist");
      cy.get("#currentAddress.mb-1").should("exist");
      cy.get("#permanentAddress.mb-1").should("exist");
    });

    it("rejects invalid email", () => {
      cy.randomFullNameGenerator("#userName");
      cy.randomTextGenerator("#userEmail");
      cy.randomAddressGenerator("#currentAddress");
      cy.randomAddressGenerator("#permanentAddress");
      cy.get("#submit").click().should("exist");
      cy.get(".border").should("not.exist");
    });
  });
});
