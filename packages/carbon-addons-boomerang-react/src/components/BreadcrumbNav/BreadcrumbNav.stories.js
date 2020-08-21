import React from 'react';
import { storiesOf } from '@storybook/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import BreadcrumbNav from './index';

storiesOf('BreadcrumbNav', module)
  .add('one link', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <BreadcrumbNav navItems={[{ label: 'Teams', to: '/teams' }]} />
      </Router>
    );
  })
  .add('one link and text', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <BreadcrumbNav navItems={[{ label: 'Teams', to: '/teams' }, { label: 'Testing Team' }]} />
      </Router>
    );
  })
  .add('two links', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <BreadcrumbNav
          navItems={[
            { label: 'Teams', to: '/teams' },
            { label: 'Testing Team', to: '/teams/123' },
          ]}
        />
      </Router>
    );
  })
  .add('two links and text', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <BreadcrumbNav
          navItems={[
            { label: 'Teams', to: '/teams' },
            { label: 'Testing Team', to: '/teams/123' },
            { label: 'Testing Tool' },
          ]}
        />
      </Router>
    );
  });
