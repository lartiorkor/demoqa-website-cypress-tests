describe("browser windows", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("windows", () => {
    it("opens a new tab", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-0").click();
      cy.location("pathname").should("eq", "/browser-windows");
      cy.visit("https://demoqa.com/browser-windows");
      cy.get("#tabButton")
        .click()
        .then(() => {
          cy.visit("https://demoqa.com/sample");
          cy.url().should("contain", "https://demoqa.com/sample");
        });
    });

    it("opens a new window", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-0").click();
      cy.location("pathname").should("eq", "/browser-windows");
      cy.get("#windowButton")
        .click()
        .then(() => {
          cy.visit("https://demoqa.com/sample");
          cy.url().should("contain", "https://demoqa.com/sample");
          cy.go("back");
        });
    });

    it("new window with a message", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-0").click();
      cy.location("pathname").should("eq", "/browser-windows");
      cy.get("#messageWindowButton").click();

      cy.wait(3000);
      cy.window().then((win) => {
        let newWindow = null;
        for (let i = 0; i < win.parent.window.length; i++) {
          if (win.parent.window[i].location.href === "about:blank") {
            newWindow = win.parent.window[i];
            break;
          }
        }
        if (newWindow != null) {
          newWindow.focus();
          cy.get("body").then((body) => {
            expect(body[0].innerText).to.include(
              "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization."
            );
          });
        }
      });
    });
  });
});
