Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log("something went wrong", err);
  return false;
});

describe("elements", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    //cy.get(".category-cards > :nth-child(1)").click();
    cy.get("div.card.mt-4.top-card").eq(0).click();
    cy.location("pathname").should("eq", "/elements");
  });

  context("text box", () => {
    it("user registration", () => {
      cy.get("#item-0").click();
      cy.get("#userName").type("John Doe");
      cy.get("#userEmail").type("jd@noon.com");
      cy.get("#currentAddress").type("123, Bahamas");
      cy.get("#permanentAddress").type("234, Home");
      cy.get("#submit").click().should("exist");
      cy.get("#output").should("exist");
      cy.get("#name").should("exist").contains("John Doe");
      cy.get("#email").should("exist").contains("jd@noon.com");
      //cy.get("p")
      //.find("#currentAddress")
      //.should("exist")
      //.contains("123, Bahamas");
      //cy.get("p").within(() => cy.get("currentAddress"));
      //cy.get("p > #currentAddress").should("exist").contains("123, Bahamas");
      cy.get("p > #currentAddress > .mb-1").should("exist");
      //cy.get("p > #permanentAddress > .mb-1").should("exist"); //.contains("234, Home");
    });

    it("rejects invalid email", () => {});
  });

  context("check box", () => {
    it("select check box", () => {
      //read about specifying pathnames
      cy.get("#item-1").click();
      cy.location("pathname").should("eq", "/checkbox");
      cy.get("button.rct-collapse.rct-collapse-btn").click();
      //read about using .check()
      cy.get("svg.rct-icon.rct-icon-uncheck").eq(1).click();
      cy.get("#result").should("exist");
    });
  });

  context("radio button", () => {
    it("select radio button", () => {
      cy.get("#item-2").click();
      cy.location("pathname").should("eq", "/radio-button");
      cy.get("label").eq(1).click();
      cy.get("p.mt-3").should("exist");
    });
  });

  context("web tables", () => {
    it("allows users to fill the form", () => {
      cy.get("#item-3").click();
      cy.location("pathname").should("eq", "/webtables");
      cy.get("#addNewRecordButton").click();
      cy.get("div.modal-content").should("exist");
      cy.get("#firstName").type("John");
      cy.get("#lastName").type("Doe");
      cy.get("#userEmail").type("john@john.com");
      cy.get("#age").type("35");
      cy.get("#salary").type("23456");
      cy.get("#department").type("Safety");
      cy.get("#submit").should("exist").click();

      //find a way to assert that data has been saved and added

      //cy.get('td:nth-child(0)'
      //cy.get(".ReactTable");

      //cy.get("tr");
    });
  });

  context("buttons", () => {
    it("button click", () => {
      cy.get("#item-4").click();
      cy.location("pathname").should("eq", "/buttons");
      cy.get("#doubleClickBtn").contains("Double Click Me").dblclick();
      cy.get("#doubleClickMessage").should("exist");
      cy.get("#rightClickBtn").contains("Right Click Me").rightclick();
      cy.get("#rightClickMessage").should("exist");
      //dynamically generated id below
      //cy.get("button#FfSav").contains("Click Me").click();
      cy.get("button.btn.btn-primary").eq(2).contains("Click Me").click();
      cy.get("#dynamicClickMessage").should("exist");
    });
  });

  context("links", () => {
    it("opens in a different tab", () => {
      cy.get("#item-5").click();
      cy.location("pathname").should("eq", "/links");
      cy.get("#simpleLink").should("have.attr", "target", "_blank").click();
      cy.get("#dynamicLink").should("have.attr", "target", "_blank").click();
    });

    it("opens in the same tab", () => {
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

  context("upload and download", () => {
    it("downloading a file", () => {
      cy.get("#item-7").click();
      cy.location("pathname").should("eq", "/upload-download");
      cy.get("#downloadButton").click();
    });

    it("uploading a file", () => {
      cy.get("#item-7").click();
      cy.location("pathname").should("eq", "/upload-download");
      cy.get("input#uploadFile.form-control-file").click().selectFile(
        "downloads/simpleFile.jpeg"

        //cy.get("input#uploadFile.form-control-file").selectFile("downloads/simpleFile.jpeg"
      );
    });
  });
});

describe("alerts, frames and windows", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    cy.get("div.card.mt-4.top-card").eq(2).click();
    cy.location("pathname").should("eq", "/alertsWindows");
  });

  context("browser windows", () => {
    it.only("opens a new tab", () => {
      //cy.get("li#item-0");
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-0").click();
      //cy.get("li#item-0.btn.btn-light.active"); //.click();
      cy.location("pathname").should("eq", "/browser-windows");
      cy.get("#tabButton").click();
      //cy.location("href").should("eq", "/sample");
    });

    it("opens a new window", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-0").click();
      cy.location("pathname").should("eq", "/browser-windows");
      cy.get("#windowButton").click();
      //new window assertion
    });

    it("new window with a message", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-0").click();
      cy.location("pathname").should("eq", "/browser-windows");
      cy.get("#messageWindowButton").click();
      //new window assertion
    });
  });

  context("alerts", () => {
    it("opens alert windows", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-1").click();
      cy.location("pathname").should("eq", "/alerts");
      cy.get("#alertButton").click();
      //window assertion
      cy.get("#timerAlertButton").click();
      //delayed window assertion
      cy.get("#confirmButton").click();
      //confirm box assertion
      //cy.get('confirmResult').should('exist')
      cy.get("#promtButton").click();
      //text prompt assertion
      //cy.get('promptResult').should('exist')
    });
  });

  context("frames", () => {
    it("checks iframe content", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-2").click();
      cy.location("pathname").should("eq", "/frames");
      cy.iframe("iframe#frame1")
        .find("h1#sampleHeading")
        .contains("This is a sample page");
    });

    it("", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-2").click();
      cy.location("pathname").should("eq", "/frames");
      cy.get("#frame2Wrapper").find("#frame2");
      //.within(() => {
      //cy.get("body#sampleHeading");
      //cy.get("body");
      //});
      //.contains("This is a sample page");
    });
  });

  context("nested frames", () => {
    it("checks for contents of nested iframes", () => {
      cy.get(":nth-child(3) > .element-list > .menu-list > #item-3").click();
      cy.location("pathname").should("eq", "/nestedframes");
      cy.iframe("iframe#frame1").within(() => {
        //cy.find("body").should("have.text", "Parent frame");
        cy.iframe("iframe").should("have.attr", "srcdoc", "Child Iframe");
        //.click();
        cy.iframe("iframe > p");
      }); //.find("body"); //.contains("Parent frame");
      ///cy.iframe()//.find().contains('Child Iframe')
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
