import React from "react";
import { render } from "react-dom";
import { Server, Response } from "miragejs";
import Root from "./Root";
import { startApiServer } from "./ApiServer";
import "Config/axiosGlobalConfig";
import "Styles/styles.scss";
import * as serviceWorker from "./serviceWorker";

if (window.Cypress) {
  new Server({
    environment: "test",
    routes() {
      const methods = ["get", "put", "patch", "post", "delete"];
      methods.forEach((method) => {
        this[method]("/*", async (schema, request) => {
          const [status, headers, body] = await window.handleFromCypress(request);
          return new Response(status, headers, body);
        });
      });
    },
  });
} else {
  if (
    (process.env.NODE_ENV === "development" || process.env.SERVICE_MODE === "local") &&
    !process.env.REACT_APP_PORT_FORWARD
  ) {
    startApiServer({ environment: "development", timing: 400 });
  }
}

render(<Root />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
