describe("modal dialogs", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("modal dialogs", () => {
    it("checks for modal content", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-4").click();
      cy.location("pathname").should("eq", "/modal-dialogs");
      cy.get("#showSmallModal").click();
      cy.get(".modal-header").contains("Small Modal");
      cy.get(".modal-body").should(
        "have.text",
        "This is a small modal. It has very less content"
      );
      cy.get(".modal-footer").find("#closeSmallModal").click();
      cy.location("pathname").should("eq", "/modal-dialogs");
      cy.get("#showLargeModal").click();
      cy.get(".modal-header").contains("Large Modal");
      cy.get(".modal-body").contains(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      );
      cy.get(".modal-footer").find("#closeLargeModal").click();
      cy.location("pathname").should("eq", "/modal-dialogs");
    });
  });
});
