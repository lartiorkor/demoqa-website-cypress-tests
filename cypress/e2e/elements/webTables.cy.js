describe("tables", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("div.card.mt-4.top-card").eq(0).click();
    cy.location("pathname").should("eq", "/elements");
  });

  context("web tables", () => {
    it("allows users to fill the form", () => {
      cy.get("#item-3").click();
      cy.location("pathname").should("eq", "/webtables");
      cy.get("#addNewRecordButton").click();
      cy.get("div.modal-content").should("exist");
      cy.randomTextGenerator("#firstName");
      cy.randomTextGenerator("#lastName");
      cy.randomEmailGenerator("#userEmail");
      cy.randomNumberGenerator("#age");
      cy.randomNumberGenerator("#salary");
      cy.randomTextGenerator("#department");
      cy.get("#submit").should("exist").click();
    });
  });
});
