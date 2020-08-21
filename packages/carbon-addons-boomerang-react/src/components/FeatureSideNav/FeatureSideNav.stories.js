import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router } from "react-router-dom";
import FeatureSideNav from './FeatureSideNav';
import FeatureSideNavLink from '../FeatureSideNavLink';
import { Search, Accordion, AccordionItem, } from 'carbon-components-react';
import { Rocket16 } from "@carbon/icons-react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Header = () => {
  return (
    <div style={{padding: "1rem"}}>
      <h1>Test Title</h1>
      <Search />
    </div>
  );
}
storiesOf('FeatureSideNav', module)
  .add('Default Feature Sidenav Link', () => {
    return (
      <Router history={history}>
        <FeatureSideNav leftBorder small>
          <FeatureSideNavLink
            to="/home"
            children="Home"
            hasDivider
          />
          <FeatureSideNavLink
            to="/link1"
            children="Link1"
          />
          <FeatureSideNavLink
            to="/link2"
            children="Link2"
          />
          <FeatureSideNavLink
            to="/link3"
            children="Link3"
          />
        </FeatureSideNav>
      </Router>
    );
  })
  .add('Default Feature Sidenav Link with Header and custom Links', () => {
    return (
      <Router 
        history={history}
      >
        <FeatureSideNav 
          header={Header}
          leftBorder 
        >
          <Accordion>
            <FeatureSideNavLink
              to="/link1"
              children="Link1"
            />
            <FeatureSideNavLink
              to="/link2"
              children="Link2"
            />
            <AccordionItem title="Item 1">
              <FeatureSideNavLink
                to="/link3"
                children="Link3"
              />
              <FeatureSideNavLink
                to="/link4"
                children="Link4"
              />
            </AccordionItem>
          </Accordion>
        </FeatureSideNav>
      </Router>
    );
  });
