import { startApiServer } from "ApiServer";
import { AppLink } from "Config/appConfig";

let server;

beforeEach(() => {
  server = startApiServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

describe("Users Detailed", function () {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/BMRG_APP_ROOT_CONTEXT${AppLink.Users()}`);
  });

  it("should render the corrent landing page", function () {
    cy.url().should("contain", AppLink.UsersCurrent());
  });

  it("should change the tab", function () {
    cy.findByText("All Users").click();
    cy.url().should("contain", AppLink.UsersList());
  });

});