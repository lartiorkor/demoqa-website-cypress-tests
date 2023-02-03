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
      cy.get("#currentAddress.mb-1").should("exist").contains("123, Bahamas");
      cy.get("#permanentAddress.mb-1").should("exist").contains("234, Home");
    });

    it("rejects invalid email", () => {});
  });

  context("check box", () => {
    it("select check box", () => {
      cy.get("#item-1").click();
      cy.location("pathname").should("eq", "/checkbox");
      cy.get("button.rct-collapse.rct-collapse-btn").click();
      cy.get('[type="checkbox"]')
        .eq(1)
        .check({ force: true })
        .should("be.checked");
      cy.get("#result").should("exist");
    });
  });

  context("radio button", () => {
    it("select radio button", () => {
      cy.get("#item-2").click();
      cy.location("pathname").should("eq", "/radio-button");
      cy.get('[type="radio"]')
        .eq(0)
        .check({ force: true })
        .should("be.checked");
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
      cy.get(".rt-table")
        .find(".rt-tbody")
        .within(() => {
          cy.get(".rt-tr-group").contains("john@john.com");
        });

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
      //cy.downloadFile("", "cypress/downloads", "sampleFileUrlApproach.jpeg");
      cy.readFile("cypress/downloads/sampleFile.jpeg");
    });

    it("uploading a file", () => {
      cy.get("#item-7").click();
      cy.location("pathname").should("eq", "/upload-download");
      cy.get("input#uploadFile[type='file']").attachFile("sampleFile");
      cy.get("#uploadedFilePath").should("exist");
    });
  });
});
