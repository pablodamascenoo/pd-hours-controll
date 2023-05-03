describe("home tests", () => {
  before(() => {
    Cypress.config("baseUrl", "http://localhost:3000");
  });
  const squadName = "front-end devs";
  it("create a squad", () => {
    cy.visit("/");

    //abre o modal de criar squad
    cy.get("button").contains("Criar Squad").click();

    //cria squad
    cy.get("input").type(squadName);
    cy.intercept("POST", "/api/squad").as("postSquad");
    cy.get("#button_squad_modal").click();
    cy.wait("@postSquad").its("response.statusCode").should("eq", 201);
    cy.get("p").contains(squadName);
  });

  it("squad já cadastrado", () => {
    cy.visit("/");
    //abre o modal de criar squad
    cy.get("button").contains("Criar Squad").click();
    //cria squad
    cy.get("input").type(squadName);
    cy.intercept("POST", "/api/squad").as("postSameSquad");
    cy.get("#button_squad_modal").click();
    cy.wait("@postSameSquad").its("response.statusCode").should("eq", 409);
    cy.get("p").contains("Squad já cadastrado");
  });
  it("trocar de página", () => {
    cy.visit("/");
    //abre o modal de criar squad
    cy.get("a").contains("Usuários").click();
    cy.url().should("include", "/users");
  });
});

describe("users tests", () => {
  before(() => {
    Cypress.config("baseUrl", "http://localhost:3000");
  });
  const squadName = "front-end devs";
  it("create a squad", () => {
    cy.visit("/");

    //abre o modal de criar squad
    cy.get("button").contains("Criar Squad").click();

    //cria squad
    cy.get("input").type(squadName);
    cy.intercept("POST", "/api/squad").as("postSquad");
    cy.get("#button_squad_modal").click();
    cy.wait("@postSquad").its("response.statusCode").should("eq", 201);
    cy.get("p").contains(squadName);
  });

  it("squad já cadastrado", () => {
    cy.visit("/");
    //abre o modal de criar squad
    cy.get("button").contains("Criar Squad").click();
    //cria squad
    cy.get("input").type(squadName);
    cy.intercept("POST", "/api/squad").as("postSameSquad");
    cy.get("#button_squad_modal").click();
    cy.wait("@postSameSquad").its("response.statusCode").should("eq", 409);
    cy.get("p").contains("Squad já cadastrado");
  });
  it("trocar de página", () => {
    cy.visit("/");
    //abre o modal de criar squad
    cy.get("a").contains("Usuários").click();
    cy.url().should("include", "/users");
  });
});
