import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  SideNav,
  SideNavLink,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react';
import { Help24, ServiceDesk16 } from '@carbon/icons-react';

import LeftSideNav from '../LeftSideNav';
import { PRIVACY_DATA } from '../PrivacyStatement/constants';

import UIShell from './UIShell';

const mock = new MockAdapter(axios);

storiesOf('UIShell', module)
  .add('default', () => {
    mock.onGet('https://www.ibm.com/users/consents').reply(200, PRIVACY_DATA);
    return (
      <UIShell
        renderLogo={boolean('renderLogo', true)}
        baseServiceUrl="https://www.ibm.com"
        appName={text('appName', 'Flow')}
        platformName={text('platformName', '')}
        headerConfig={{
          platformMessage: {
            kind: text('platformMessage.kind', 'info'),
            message: text('platformMessage.message', 'Message Goes Here'),
            title: text('platformMessage.title', 'Testing Platform Title'),
          },
          navigation: [
            {
              name: 'Launchpad',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Admin',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Docs',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
          ],
          features: {
            'banner.enabled': boolean('banner.enabled', true),
            'notifications.enabled': boolean('notifications.enabled', true),
            'support.enabled': boolean('support.enabled', true),
          },
          platform: {
            name: text('platform.name', 'IBM Boomerang Platform'),
            version: text('platform.version', '5.0.0'),
            signOutUrl: 'https://ibm.com',
            communityUrl: 'https://developer.ibm.com',
          },
        }}
        onTutorialClick={action('Tutorial')}
        skipToContentProps={{ href: '#id' }}
        user={{
          name: 'test user',
          email: 'test.user@ibm.com',

          hasConsented: true,
          status: 'active',
        }}
      />
    );
  })
  .add('user not consented', () => {
    mock.onGet('https://www.ibm.com/users/consents').reply(200, PRIVACY_DATA);
    return (
      <UIShell
        baseServiceUrl="https://www.ibm.com"
        platformName={text('platformName', '')}
        headerConfig={{
          navigation: [
            {
              name: 'Launchpad',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Admin',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Docs',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
          ],
          features: {
            'notifications.enabled': boolean('notifications.enabled', true),
            'support.enabled': boolean('support.enabled', true),
          },
          platform: {
            name: text('platform.name', 'IBM Boomerang Platform'),
            version: text('platform.version', '5.0.0'),
            signOutUrl: 'ibm.com',
            communityUrl: 'https://developer.ibm.com',
          },
        }}
        onTutorialClick={action('Tutorial')}
        productName={text('productName', '')}
        renderLogo={boolean('renderLogo', true)}
        user={{
          name: 'test user',
          email: 'test.user@ibm.com',

          hasConsented: false,
          status: 'active',
        }}
      />
    );
  })
  .add('user pending deletion', () => {
    mock.onGet('https://www.ibm.com/users/consents').reply(200, PRIVACY_DATA);
    return (
      <UIShell
        renderLogo={boolean('renderLogo', true)}
        baseServiceUrl="https://www.ibm.com"
        platformName={text('platformName', '')}
        headerConfig={{
          navigation: [
            {
              name: 'Launchpad',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Admin',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Docs',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
          ],
          features: {
            'notifications.enabled': boolean('notifications.enabled', true),
            'support.enabled': boolean('support.enabled', true),
          },
          platform: {
            name: text('platform.name', 'IBM Boomerang Platform'),
            version: text('platform.version', '5.0.0'),
            signOutUrl: 'ibm.com',
            communityUrl: 'https://developer.ibm.com',
          },
        }}
        onTutorialClick={action('Tutorial')}
        productName={text('productName', '')}
        user={{
          name: 'test user',
          email: 'test.user@ibm.com',

          hasConsented: false,
          status: 'pending_deletion',
        }}
      />
    );
  })
  .add('with Carbon sidenav and React Router ', () => {
    mock.onGet('https://www.ibm.com/users/consents').reply(200, PRIVACY_DATA);
    return (
      <Router>
        <UIShell
          baseServiceUrl="https://www.ibm.com"
          platformName={text('platformName', '')}
          headerConfig={{
            navigation: [
              {
                name: 'Launchpad',
                url: 'https://launch.boomerangplatform.net/launchpad',
              },
              {
                name: 'Admin',
                url: 'https://launch.boomerangplatform.net/launchpad',
              },
              {
                name: 'Docs',
                url: 'https://launch.boomerangplatform.net/launchpad',
              },
            ],
            features: {
              'notifications.enabled': boolean('notifications.enabled', true),
              'support.enabled': boolean('support.enabled', true),
            },
            platform: {
              name: text('platform.name', 'IBM Boomerang Platform'),
              version: text('platform.version', '5.0.0'),
              signOutUrl: 'ibm.com',
              communityUrl: 'https://developer.ibm.com',
            },
          }}
          renderSidenav={({ isOpen }) => (
            <LeftSideNav isOpen={isOpen}>
              <SideNav expanded isChildOfHeader aria-label="sidenav">
                <SideNavItems>
                  <SideNavMenu title="Large menu" large>
                    <SideNavMenuItem element={Link} to="/">
                      Menu 1
                    </SideNavMenuItem>
                    <SideNavMenuItem element={Link} to="/">
                      Menu 3
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavMenu renderIcon={ServiceDesk16} title="Large menu w/icon" large>
                    <SideNavMenuItem isActive element={Link} to="">
                      Menu 1
                    </SideNavMenuItem>
                    <SideNavMenuItem href="">Menu 2</SideNavMenuItem>
                    <SideNavMenuItem href="">Menu 3</SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavLink isActive element={Link} renderIcon={ServiceDesk16} to="" large>
                    Large link w/icon
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </LeftSideNav>
          )}
          onTutorialClick={action('Tutorial')}
          productName={text('productName', '')}
          renderLogo={boolean('renderLogo', true)}
          user={{
            name: 'test user',
            email: 'test.user@ibm.com',
          }}
        />
      </Router>
    );
  })
  .add('with right panel', () => {
    mock.onGet('https://www.ibm.com/users/consents').reply(200, PRIVACY_DATA);
    return (
      <UIShell
        baseServiceUrl="https://www.ibm.com"
        platformName={text('platformName', '')}
        headerConfig={{
          navigation: [
            {
              name: 'Launchpad',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Admin',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
            {
              name: 'Docs',
              url: 'https://launch.boomerangplatform.net/launchpad',
            },
          ],
          features: {
            'notifications.enabled': boolean('notifications.enabled', true),
            'support.enabled': boolean('support.enabled', true),
          },
          platform: {
            name: text('platform.name', 'IBM Boomerang Platform'),
            version: text('platform.version', '5.0.0'),
            signOutUrl: 'ibm.com',
            communityUrl: 'https://developer.ibm.com',
          },
        }}
        onTutorialClick={action('Tutorial')}
        productName={text('productName', '')}
        renderLogo={boolean('renderLogo', true)}
        renderRightPanel={{
          icon: <Help24 />,
          component: (
            <div
              style={{
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '4rem',
                width: '25rem',
              }}
            >
              Custom content behaviour
            </div>
          ),
        }}
        user={{
          name: 'test user',
          email: 'test.user@ibm.com',
          hasConsented: true,
          status: 'active',
        }}
      />
    );
  })
  .add('without props', () => {
    mock.onGet('https://www.ibm.com/users/consents').reply(200, PRIVACY_DATA);
    return <UIShell />;
  });
