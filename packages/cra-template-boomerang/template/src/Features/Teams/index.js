import React from "react";
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
import styles from "./teams.module.scss"

Teams.propTypes = {};

function Teams() {

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
           Save Team
        </Button>
      }
      header={
        <>
          <HeaderTitle className={styles.title}>Teams</HeaderTitle>
          <HeaderSubtitle>Teams details displayed bellow</HeaderSubtitle>
        </>
      }
    />
  );
}

export default Teams;
