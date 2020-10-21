import React from "react";
import AppContext from "State/appContext";
import { Router } from "react-router-dom";
import { navigation, userProfile } from "./ApiServer/fixtures";
import { createMemoryHistory } from "history";
import { render as rtlRender } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// React-modal
beforeEach(() => {
  document.body.setAttribute("id", "app");
});

function rtlRouterRender(
  ui,
  { route = "/", history = createMemoryHistory({ initialEntries: [route] }), ...options } = {}
) {
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>, options),
    history,
  };
}

const defaultContextValue = {
  user: userProfile,
  navigation: navigation,
};

function rtlContextRouterRender(
  ui,
  {
    contextValue = {},
    initialState = {},
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    ...options
  } = {}
) {
  return {
    ...rtlRender(
      <AppContext.Provider value={{ ...defaultContextValue, ...contextValue }}>
        <Router history={history}>{ui}</Router>
      </AppContext.Provider>,
      options
    ),
  };
}

// RTL globals
global.rtlRender = rtlRender;
global.rtlRouterRender = rtlRouterRender;
global.rtlContextRouterRender = rtlContextRouterRender;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
global.sessionStorage = sessionStorageMock;

//Dates
const DATE_TO_USE = new Date("Jan 1 2019 00:00:00 UTC");
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;
const moment = jest.requireActual("moment-timezone");
jest.doMock("moment", () => {
  moment.tz.setDefault("UTC");
  return moment;
});
