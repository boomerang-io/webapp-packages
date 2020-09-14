import React from "react";
import { waitFor } from "@testing-library/react";
import { queryCaches } from "react-query";
import { startApiServer } from "ApiServer";
import Users from "./index";

let server;

beforeEach(() => {
  server = startApiServer();
});

afterEach(() => {
  server.shutdown();
  queryCaches.forEach((queryCache) => queryCache.clear());
});

describe("RTL", () => {
  it("Capturing Snapshot of Users", async () => {
    const { baseElement, getByText } = rtlRender(<Users />);
    await waitFor(() => expect(getByText("User details displayed bellow")).toBeInTheDocument());
    expect(baseElement).toMatchSnapshot();
  });
});
  
