import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FeatureHeader from './index';

const tabs = [
  { label: 'Activity', to: '/activity' },
  { label: 'Pipelines', to: '/pipelines' },
  { label: 'Requests', to: '/requests' },
  { label: 'Configuration', to: '/configuration' },
  { label: 'Triggers', to: '/triggers' },
];

const navItems = [{ label: 'Teams', to: '/teams' }, { label: 'Testing Team' }];

storiesOf('FeatureHeader', module)
  .add('default', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader style={{ padding: ' 0 1.5rem 1.5rem' }}>
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
        <FeatureHeader includeBorder={false} style={{ padding: ' 0 1.5rem 1.5rem' }}>
          <hgroup>
            <h1>Without Border</h1>
          </hgroup>
        </FeatureHeader>
      </div>
    );
  })
  .add('with tabs', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader style={{ padding: ' 0 1.5rem' }} tabs={tabs}>
            <hgroup style={{ marginBottom: '0.5rem' }}>
              <h1>With Tabs</h1>
              <h2>Subtitle</h2>
            </hgroup>
          </FeatureHeader>
        </div>
      </Router>
    );
  })
  .add('with navItems', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader style={{ padding: ' 0 1.5rem 1.5rem' }} navItems={navItems}>
            <hgroup style={{ marginTop: '1rem' }}>
              <h1>With Nav Items</h1>
              <h2>Subtitle</h2>
            </hgroup>
          </FeatureHeader>
        </div>
      </Router>
    );
  });
