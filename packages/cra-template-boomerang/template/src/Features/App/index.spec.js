import React from "react";
import { waitFor } from "@testing-library/react";
import { queryCaches } from "react-query";
import { startApiServer } from "ApiServer";
import App from "./index";

let server;

beforeEach(() => {
  server = startApiServer();
});

describe("App", () => {
  describe("RTL", () => {
    it("Capturing Snapshot of App", async () => {
      const { baseElement } = rtlContextRouterRender(<App />);

      expect(baseElement).toMatchSnapshot();
      await waitFor(() => {});
    });
  });
});
