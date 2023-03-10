describe("upload and download", () => {
  beforeEach(() => {
    cy.visit("/upload-download");
  });

  context("successful file upload and download", () => {
    it("downloading a file", () => {
      cy.get("#downloadButton").click();
      cy.readFile("cypress/downloads/sampleFile.jpeg");
    });

    it("uploading a file", () => {
      cy.get("input#uploadFile[type='file']").attachFile("sampleFile");
      cy.get("#uploadedFilePath").should("exist");
    });
  });
});
