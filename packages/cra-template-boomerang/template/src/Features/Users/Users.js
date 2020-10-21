import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAppContext } from "Hooks";
import {
  Button,
  FeatureHeader,
  FeatureHeaderTitle as HeaderTitle,
  FeatureHeaderSubtitle as HeaderSubtitle,
  FeatureNavTab as Tab,
  FeatureNavTabs as Tabs,
} from "@boomerang-io/carbon-addons-boomerang-react";
import CurrentUser from "./CurrentUser";
import UserList from "./UserList";
import { AppLink, AppPath } from "Config/appConfig";
import { Save16 } from "@carbon/icons-react";
import styles from "./Users.module.scss";

function Users() {
  const { user } = useAppContext();

  return (
    <>
      <FeatureHeader
        header={
          <>
            <HeaderTitle className={styles.title}>Users</HeaderTitle>
            <HeaderSubtitle>View current and all users</HeaderSubtitle>
          </>
        }
        footer={
          <Tabs>
            <Tab label="Current User" to={AppLink.UsersCurrent()} />
            <Tab label="All Users" to={AppLink.UsersList()} />
          </Tabs>
        }
        actions={
          <Button
            renderIcon={Save16}
            iconDescription="Save"
            onClick={() => {
              console.log("Do something here!");
            }}
            size="field"
          >
            Update Users
          </Button>
        }
      />
      <Switch>
        <Route exact path={AppPath.UsersCurrent}>
          <CurrentUser user={user} />
        </Route>
        <Route exact path={AppPath.UsersList}>
          <UserList />
        </Route>
        <Redirect from="*" to={AppLink.UsersCurrent()} />
      </Switch>
    </>
  );
}

export default Users;
