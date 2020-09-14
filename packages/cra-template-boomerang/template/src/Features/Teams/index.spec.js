import React from "react";
import { waitFor } from "@testing-library/react";
import { queryCaches } from "react-query";
import { startApiServer } from "ApiServer";
import Teams from "./index";

let server;

beforeEach(() => {
  server = startApiServer();
});

afterEach(() => {
  server.shutdown();
  queryCaches.forEach((queryCache) => queryCache.clear());
});

describe("RTL", () => {
  it("Capturing Snapshot of Teams", async () => {
    const { baseElement, getByText } = rtlRender(<Teams />);
    await waitFor(() => expect(getByText("Teams details displayed bellow")).toBeInTheDocument());
    expect(baseElement).toMatchSnapshot();
  });
});
  
