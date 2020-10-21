import React from "react";
import { waitFor, fireEvent } from "@testing-library/react";
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
  describe("RTL - snapshot", () => {
    it("Capturing Snapshot of App", async () => {
      const { baseElement, getByText } = rtlRouterRender(<App />);
      await waitFor(() => expect(getByText("Select the hamburger menu to navigate to other pages.")).toBeInTheDocument());
      expect(baseElement).toMatchSnapshot();
    });

    it("Changing Component - searching for Title text", async () => {
      const { getByText} = rtlRouterRender(<App />);
      await waitFor(() => expect(getByText("Select the hamburger menu to navigate to other pages.")).toBeInTheDocument());
  
      fireEvent.click(getByText("Users"));
  
      await waitFor(() => expect(getByText("View current and all users")).toBeInTheDocument());
    });
  });
});
