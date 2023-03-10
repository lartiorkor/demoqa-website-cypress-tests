describe("alerts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("opens alert windows", () => {
    it.only("opens alert windows", () => {
      cy.get("li#item-1.btn.btn-light").eq(1).click();
      cy.location("pathname").should("eq", "/alerts");
      cy.get("#alertButton").click();
      cy.on("window", (text) => {
        expect(text).to.equal("something else"); //You clicked a button
      });
      cy.get("#timerAlertButton").click();
      cy.on("window", (text) => {
        expect(text).to.equal("This alert appeared after 5 seconds");
      });
      cy.get("#confirmButton").click();
      cy.on("window:confirm", (text) => {
        expect(text).to.equal("Do you confirm action?");
        return false;
      });
      cy.get("span#confirmResult.text-success").should(
        "have.text",
        "You selected Cancel"
      );
      cy.get("#alertButton").click();
      cy.window().then((window) => {
        cy.stub(window, "prompt").returns("saymyname");
      });
      cy.get("#promtButton").click();
      cy.get("#promptResult").should("have.text", "You entered saymyname");
    });
  });
});
