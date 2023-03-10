describe("alerts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
    cy.get("li#item-1.btn.btn-light").eq(1).click();
    cy.location("pathname").should("eq", "/alerts");
  });

  context("alerts, confirm windows and prompts", () => {
    it("alert window", () => {
      cy.get("#alertButton").click();
      cy.on("window:alert", (text) => {
        expect(text).to.equal("You clicked a button");
      });
    });

    it("delayed alert window", () => {
      cy.get("#timerAlertButton").click();
      cy.wait(5000);
      cy.on("window:alert", (text) => {
        expect(text).eql("This alert appeared after 5 seconds");
      });
    });

    it("confirm button", () => {
      cy.get("#confirmButton").click();
      cy.on("window:confirm", (text) => {
        expect(text).to.equal("Do you confirm action?");
        return false;
      });
      cy.get("span#confirmResult.text-success").should(
        "have.text",
        "You selected Cancel"
      );
    });

    it("prompt", () => {
      cy.window().then((window) => {
        cy.stub(window, "prompt").returns("saymyname");
      });
      cy.get("#promtButton").click();
      cy.get("#promptResult").should("have.text", "You entered saymyname");
    });
  });
});
