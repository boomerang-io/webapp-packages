import React from "react";
import PropTypes from "prop-types";
import {
  FeatureHeader,
  Button,
  FeatureHeaderTitle as HeaderTitle,
  FeatureHeaderSubtitle as HeaderSubtitle,
  FeatureNavTab as Tab,
  FeatureNavTabs as Tabs,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { AppLink } from "Config/appConfig";
import { Save16 } from "@carbon/icons-react";
import styles from "./users.module.scss"

Users.propTypes = {
  user: PropTypes.object
};

function Users({ user }) {

  return (
    <FeatureHeader 
    // For Demo purposes, these tabs only switch from one page to another but they can be customize to only update the content 
      footer={
        <Tabs>
          <Tab label="Go To Teams Page" to={AppLink.Teams()} />
          <Tab label="Go To Users Page" to={AppLink.Users()} />
        </Tabs>
      }
      actions={
        <Button
          renderIcon={Save16}
          iconDescription="Save"
          onClick={() => {}}
          size="field"
        >
           Save User
        </Button>
      }
      header={
        <>
          <HeaderTitle className={styles.title}>User</HeaderTitle>
          <HeaderSubtitle>User details displayed bellow</HeaderSubtitle>
        </>
      }
    />
  );
}

export default Users;
