Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log("something went wrong", err);
  return false;
});

describe("alerts, frames and windows", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("browser windows", () => {
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
          //////
          cy.go("back");
        });
    });

    it.only("new window with a message", () => {
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

  context("alerts", () => {
    it("opens alert windows", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-1").click();
      cy.location("pathname").should("eq", "/alerts");
      cy.get("#alertButton").click();
      cy.on("window", (text) => {
        expect(text).to.equal("You clicked a button");
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
    });

    it("clicks prompt button", () => {
      //cy.visit("https://demoqa.com/alerts");
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-1").click();
      cy.location("pathname").should("eq", "/alerts");
      cy.get("#alertButton").click();
      cy.window().then((window) => {
        cy.stub(window, "prompt").returns("saymyname");
      });
      cy.get("#promtButton").click();
      cy.get("#promptResult").should("have.text", "You entered saymyname");
    });
  });

  context("frames", () => {
    it("checks large iframe content", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-2").click();
      cy.location("pathname").should("eq", "/frames");
      cy.iframe("iframe#frame1")
        .find("h1#sampleHeading")
        .contains("This is a sample page");
    });
    it("checks small iframe content", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-2").click();
      cy.location("pathname").should("eq", "/frames");
      cy.get("#frame2Wrapper")
        .iframe("#frame2")
        .find("h1#sampleHeading")
        .contains("This is a sample page");
    });
  });

  context("nested frames", () => {
    it("checks for contents of nested iframes", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-3").click();
      cy.location("pathname").should("eq", "/nestedframes");
      cy.iframe("iframe#frame1")
        .contains("Parent frame")
        .within(() => {
          cy.iframe("iframe").contains("Child Iframe");
        });
    });
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
