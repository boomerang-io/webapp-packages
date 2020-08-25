import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FeatureHeader from './index';
import { default as Tabs } from '../FeatureNavTabs';
import { default as Tab } from '../FeatureNavTab';
import BreadcrumbNav from '../BreadcrumbNav';
import { Button } from 'carbon-components-react';
import { Save16, View16 } from '@carbon/icons-react';

const navItems = [{ label: 'Teams', href: '/teams' }, { label: 'Testing Team' }];

const Footer = () => {
  return (
    <Tabs>
      <Tab label="Services" to="/services" />
      <Tab label="Members" to="/members" />
      <Tab label="Service Requests" to="/service-requests" />
      <Tab label="Members Requests" to="/members-requests" />
      <Tab label="Settings" to="/settings" />
    </Tabs>
  );
};

const Actions = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1rem' }}>
    <Button kind="ghost" renderIcon={View16} style={{ marginRight: '1rem', width: '10rem' }}>
      View component
    </Button>
    <Button renderIcon={Save16} style={{ width: '10rem' }}>
      Save
    </Button>
  </div>
);

storiesOf('FeatureHeader', module)
  .add('default', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader style={{ padding: '0 1.5rem 1.5rem' }}>
          <hgroup>
            <h1>Title</h1>
            <h2>Subtitle</h2>
          </hgroup>
        </FeatureHeader>
      </div>
    );
  })
  .add('without border', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader includeBorder={false} style={{ padding: '0 1.5rem 1.5rem' }}>
          <hgroup>
            <h1>Without Border</h1>
          </hgroup>
        </FeatureHeader>
      </div>
    );
  })
  .add('with footer', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader style={{ padding: '0 1.5rem' }} footer={Footer}>
            <hgroup style={{ marginBottom: '0.5rem' }}>
              <h1>With Footer</h1>
              <h2>Subtitle</h2>
            </hgroup>
          </FeatureHeader>
        </div>
      </Router>
    );
  })
  .add('with header', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            style={{ padding: '0 1.5rem 1.5rem' }}
            header={() => <BreadcrumbNav navItems={navItems} />}
          >
            <hgroup style={{ marginTop: '1rem' }}>
              <h1>With Header</h1>
              <h2>Subtitle</h2>
            </hgroup>
          </FeatureHeader>
        </div>
      </Router>
    );
  })
  .add('with actions', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader style={{ padding: '0 1.5rem' }} actions={Actions}>
            <hgroup style={{ marginBottom: '1rem' }}>
              <h1>With Actions</h1>
              <h2>Subtitle</h2>
            </hgroup>
          </FeatureHeader>
        </div>
      </Router>
    );
  })
  .add('with header, footer and actions', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            style={{ padding: '0 1.5rem' }}
            header={() => <BreadcrumbNav navItems={navItems} />}
            footer={Footer}
            actions={Actions}
          >
            <hgroup style={{ margin: '1rem 0' }}>
              <h1>With Everything</h1>
              <h2>Subtitle</h2>
            </hgroup>
          </FeatureHeader>
        </div>
      </Router>
    );
  });
