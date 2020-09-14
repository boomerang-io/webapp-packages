import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Switch, Redirect, Route } from "react-router-dom";
import {
  DelayedRender,
  Error404,
  NotificationsContainer,
  Loading
} from "@boomerang-io/carbon-addons-boomerang-react";
import { AppPath } from "Config/appConfig";
import styles from "./main.module.scss";

Main.propTypes = {
  user: PropTypes.object.isRequired,
};

const Teams = lazy(() => import(/* webpackChunkName: "Requests" */ "Features/Teams"));
const Users = lazy(() => import(/* webpackChunkName: "Users" */ "Features/Users"));

function Main({ user }) {

  return (
    <main id="content" className={styles.container}>
      <Suspense
        fallback={
          <DelayedRender>
            <Loading />
          </DelayedRender>
        }
      >
        <Switch>
          <Route path={AppPath.Teams}>
            <Teams />
          </Route>
          <Route path={AppPath.Users}>
            <Users user={user} />
          </Route>

          <Redirect exact from="/" to={AppPath.Users} />
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Suspense>
      <NotificationsContainer enableMultiContainer />
    </main>
  );
}

export default Main;
