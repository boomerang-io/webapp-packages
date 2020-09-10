import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import { startApiServer } from "./ApiServer";
import 'Config/axiosGlobalConfig';
import "Styles/styles.scss";
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === "development" && !process.env.REACT_APP_PORT_FORWARD) {
  startApiServer({ environment: "development", timing: 400 });
}

// Setup hot module reloading to improve dev experience
render(<Root />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
