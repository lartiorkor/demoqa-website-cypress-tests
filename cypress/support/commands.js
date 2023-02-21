import "cy-iframe";
import "cypress-file-upload";

const textGenerator = () => {
  const randomtext = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const textlength = Math.ceil(Math.random() * 10);
  let text = "";
  while (text.length < textlength) {
    text += randomtext[Math.floor(Math.random() * randomtext.length)];
  }
  return text;
};

Cypress.Commands.add("randomTextGenerator", (selector) => {
  let randomString = textGenerator();
  cy.get(selector).type(randomString);
});

Cypress.Commands.add("randomFullNameGenerator", (selector) => {
  let randomFullName = `${textGenerator()} ${textGenerator()}`;
  cy.get(selector).type(randomFullName);
});

Cypress.Commands.add("randomEmailGenerator", (selector) => {
  let randomEmail = `${textGenerator()}@mail.com`;
  cy.get(selector).type(randomEmail);
});

Cypress.Commands.add("randomAddressGenerator", (selector) => {
  let randomAddress = `${Math.floor(Math.random() * 500)}, ${textGenerator()}`;
  cy.get(selector).type(randomAddress);
});

Cypress.Commands.add("randomNumberGenerator", (selector) => {
  let randomNumber = Math.floor(Math.random() * 100);
  cy.get(selector).type(randomNumber);
});
