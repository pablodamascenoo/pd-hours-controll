/// <reference types="cypress" />

describe("home tests", () => {
  before(async () => {
    Cypress.config("baseUrl", "http://localhost:3000");
  });
  const squadName = "front-end devs";
  it("create a squad", () => {
    cy.request("DELETE", `/api/reset`).as("resetDB");
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
  let text: string;
  const userName = "pablo";
  beforeEach(() => {
    Cypress.config("baseUrl", "http://localhost:3000");
    cy.visit("/");
    cy.get("td:first-of-type").then(($td) => {
      text = $td.text();
    });
  });
  it("create a user", () => {
    cy.visit("/users");

    //abre o modal de criar user
    cy.get("button").contains("Criar Usuário").click();

    //cria user
    cy.get("#name").type(userName);
    cy.get("#squadId").type(text);
    cy.get("#estimatedHours").type("20");
    cy.intercept("POST", "/api/employee").as("postEmployee");
    cy.get("form>button").click();
    cy.wait("@postEmployee").its("response.statusCode").should("eq", 201);
    cy.get("td").contains(userName);
  });
});
