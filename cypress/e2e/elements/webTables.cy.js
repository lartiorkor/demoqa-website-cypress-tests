describe("tables", () => {
  context("web tables", () => {
    it("allows users to fill the form", () => {
      cy.visit("/webtables");
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
