import "cy-iframe";
import "cypress-file-upload";

//require("cypress-downloadfile/lib/downloadFileCommand");

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log("something went wrong", err);
  return false;
});
