const Url = "localhost:3000/"

describe("Home", function () {
  beforeEach(() => {
    cy.visit(Url);
  });

  it("Home Page", function () {
    cy.findByText("Main Content To Be Added").should("exist");
  });
});