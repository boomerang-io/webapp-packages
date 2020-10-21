import React from "react";
import { waitFor, fireEvent } from "@testing-library/react";
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
    const { baseElement, getByText } = rtlRouterRender(<Users />);
    await waitFor(() => expect(getByText("View current and all users")).toBeInTheDocument());
    expect(baseElement).toMatchSnapshot();
  });

  it("Changing Tabs - searching for user in the table", async () => {
    const { getByText, queryByText } = rtlRouterRender(<Users />);
    await waitFor(() => expect(getByText("View current and all users")).toBeInTheDocument());
    expect(queryByText(/bmrgjoe@ibm.com/i)).not.toBeInTheDocument();

    fireEvent.click(getByText("All Users"));

    await waitFor(() => expect(getByText(/bmrgjoe@ibm.com/i)).toBeInTheDocument() );
  });
});
  
