describe("text box", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(0).click();
    cy.location("pathname").should("eq", "/elements");
  });

  context("user registration", () => {
    it("valid user credentials", () => {
      cy.get("#item-0").click();
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
      cy.get("#item-0").click();
      cy.randomFullNameGenerator("#userName");
      cy.randomTextGenerator("#userEmail");
      cy.randomAddressGenerator("#currentAddress");
      cy.randomAddressGenerator("#permanentAddress");
      cy.get("#submit").click().should("exist");
      cy.get(".border").should("not.exist");
    });
  });
});
