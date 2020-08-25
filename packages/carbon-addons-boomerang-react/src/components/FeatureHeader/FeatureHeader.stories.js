import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from './index';
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
    <Button
      kind="ghost"
      renderIcon={View16}
      style={{ marginRight: '1rem', width: '10rem' }}
      size="field"
    >
      View component
    </Button>
    <Button renderIcon={Save16} style={{ width: '10rem' }} size="field">
      Save
    </Button>
  </div>
);

storiesOf('FeatureHeader', module)
  .add('default', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader
          title={
            <>
              <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
              <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
            </>
          }
        />
      </div>
    );
  })
  .add('subtitle first', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader
          title={
            <>
              <FeatureHeaderSubtitle style={{ fontSize: '0.875rem', fontWeight: '300' }}>
                Subtitle as label
              </FeatureHeaderSubtitle>
              <FeatureHeaderTitle style={{ fontSize: '1.5rem' }}>I'm smaller</FeatureHeaderTitle>
            </>
          }
        />
      </div>
    );
  })
  .add('without border', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader
          includeBorder={false}
          title={
            <>
              <FeatureHeaderTitle>Withouth Border</FeatureHeaderTitle>
              <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
            </>
          }
        ></FeatureHeader>
      </div>
    );
  })
  .add('with footer', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader footer={<Footer />} />
        </div>
      </Router>
    );
  })
  .add('with header', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            nav={<BreadcrumbNav navItems={navItems} />}
            title={
              <>
                <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
                <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
              </>
            }
          />
        </div>
      </Router>
    );
  })
  .add('with actions', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            actions={<Actions />}
            title={
              <>
                <FeatureHeaderTitle>With Actions</FeatureHeaderTitle>
                <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
              </>
            }
          ></FeatureHeader>
        </div>
      </Router>
    );
  })
  .add('with header, footer and actions', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            nav={<BreadcrumbNav navItems={navItems} />}
            footer={<Footer />}
            actions={<Actions />}
            title={
              <>
                <FeatureHeaderTitle>With Everything</FeatureHeaderTitle>
                <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
              </>
            }
          ></FeatureHeader>
        </div>
      </Router>
    );
  });
