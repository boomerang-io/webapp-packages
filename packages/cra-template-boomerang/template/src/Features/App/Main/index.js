import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { DelayedRender, Error404, NotificationsContainer, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import { AppPath } from "Config/appConfig";
import styles from "./main.module.scss";

Main.propTypes = {
  user: PropTypes.object.isRequired,
};

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
          <Route exact path={AppPath.Root}>
            <article className={styles.welcome}>
              <h1>Hello!</h1>
              <p>Welcome to the Create React App Boomerang Template.</p>
              <br />
              <p>Select the hamburger menu to navigate to other pages.</p>
            </article>
          </Route>
          <Route path={AppPath.Users}>
            <Users user={user} />
          </Route>
          <Route path={"*"}>
            <Error404 />
          </Route>
        </Switch>
      </Suspense>
      <NotificationsContainer enableMultiContainer />
    </main>
  );
}

export default React.memo(Main);
