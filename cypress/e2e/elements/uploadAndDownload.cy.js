describe("upload and download", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("div.card.mt-4.top-card").eq(0).click();
    cy.location("pathname").should("eq", "/elements");
  });

  context("successful file upload and download", () => {
    it("downloading a file", () => {
      cy.get("#item-7").click();
      cy.location("pathname").should("eq", "/upload-download");
      cy.get("#downloadButton").click();
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
