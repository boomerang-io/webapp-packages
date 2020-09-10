import React from "react";
import { waitFor } from "@testing-library/react";
import { queryCaches } from "react-query";
import { startApiServer } from "ApiServer";
import App from "./index";

let server;

beforeEach(() => {
  server = startApiServer();
});

afterEach(() => {
  server.shutdown();
  queryCaches.forEach((queryCache) => queryCache.clear());
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
