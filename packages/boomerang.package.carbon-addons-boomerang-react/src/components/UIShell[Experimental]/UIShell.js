import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Content,
  Header,
  HeaderMenuButton as HeaderHamburgerButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  // SideNavHeader,
  // SideNavDetails,
  // SideNavSwitcher,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react/lib/components/UIShell';
import { Close24, Notification24, User24, Help24 } from '@carbon/icons-react';

import Notifications from '../PlatformNotifications';

// import Notification24 from '@carbon/icons-react/lib/notification/24';
// import User24 from '@carbon/icons-react/lib/user/24';
// import Help24 from '@carbon/icons-react/lib/help/24';
// import Close24 from '@carbon/icons-react/lib/close/24';
// import './styles.scss';

// Defaults

function headerNavigation() {
  return (
    <>
      <HeaderMenuItem href="#">Launchpad</HeaderMenuItem>
      <HeaderMenu aria-label="Apps">
        <HeaderMenuItem href="#">Link 4</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
      </HeaderMenu>
      <HeaderMenuItem href="#">Next</HeaderMenuItem>
      <HeaderMenuItem href="#">Docs</HeaderMenuItem>
      <HeaderMenuItem href="#">Admin</HeaderMenuItem>
    </>
  );
}

function ProfileMenu() {
  return (
    <>
      <HeaderMenuItem onClick={() => {}}>
        <a href="#test">Link 4</a>
      </HeaderMenuItem>
      <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
      <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
    </>
  );
}

function HelpMenu() {
  return (
    <>
      <HeaderMenuItem href="#">Link 4</HeaderMenuItem>
      <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
      <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
    </>
  );
}

class UIShell extends Component {
  static propTypes = {
    children: PropTypes.node,
    handleOnHamburgerClick: PropTypes.func,
    headerNameHref: PropTypes.string,
    headerNavigation: PropTypes.func,
    headerPrefix: PropTypes.string,
    headerTitle: PropTypes.string.isRequired,
    helpMenu: PropTypes.func,
    profileMenu: PropTypes.func,
    socketUrl: PropTypes.string,
  };

  static defaultProps = {
    handleOnHamburgerClick: () => {},
    headerNameHref: '',
    headerNavigation,
    helpMenu: () => <HelpMenu />,
    profileMenu: () => <ProfileMenu />,
    socketUrl: 'ws://test',
  };

  state = {
    hasNewNotifications: false,
    isGlobalActive: false,
    isHelpActive: false,
    isSidenavMenuActive: false,
    isNotificationActive: false,
    isProfileActive: false,
  };

  sidenavMenuRef = React.createRef();

  // handleClickOutside = () => {
  //   this.setState({
  //     isGlobalActive: false,
  //     isHelpActive: false,
  //     isSidenavMenuActive: false,
  //     isNotificationActive: false,
  //     isProfileActive: false,
  //   });
  // };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.sidenavMenuRef && !this.sidenavMenuRef.current.contains(event.target)) {
      this.handleUpdateStateKey('isSidenavMenuActive')(false);
    }
  };

  handleIconClick = (type) => (evt) => {
    Object.keys(this.state)
      .filter((key) => key.startsWith('is'))
      .forEach((key) => {
        const clickType = `is${type}Active`;
        if (key === clickType) {
          this.setState({
            [clickType]: !this.state[clickType],
          });

          // Add callback if parent wants event emitted
          // Match prop name for handling on element click
          const propFunc = this.props[`handleOn${type}Click`];
          if (typeof propFunc === 'function') {
            propFunc(evt);
          }
          // } else {
          //   this.setState({
          //     [key]: false,
          //   });
        }
      });
  };

  /**
   * @param {string} key - key in state to update
   * @returns {Function} - pass in value for key
   */
  handleUpdateStateKey = (key) => (value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    return (
      <>
        <Header aria-label={`${this.props.headerPrefix} ${this.props.headerTitle}`}>
          <SkipToContent />
          {this.props.handleOnHamburgerClick && this.state.isSidenavMenuActive ? (
            <HeaderGlobalAction
              onClick={this.handleIconClick('SidenavMenu')}
              aria-label="Close sidenav menu"
            >
              <Close24 fill="white" />
            </HeaderGlobalAction>
          ) : (
            <HeaderHamburgerButton
              aria-label="Open sidenav menu"
              onClick={this.handleIconClick('SidenavMenu')}
            />
          )}
          <HeaderName href={this.headerNameHref} prefix={this.props.headerPrefix}>
            {this.props.headerTitle}
          </HeaderName>
          <HeaderNavigation aria-label="Header Navigation">
            {this.props.headerNavigation()}
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Notification"
              onClick={this.handleIconClick('Notification')}
            >
              <Notification24 />
              <Notifications
                url={this.props.socketUrl}
                isNotificationActive={this.state.isNotificationActive}
                setHasNewNotifications={this.handleUpdateStateKey('hasNewNotifications')}
              />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <HeaderNavigation>
            <HeaderMenu aria-label={<Help24 fill="white" />} onClick={this.handleIconClick('Help')}>
              {this.props.helpMenu && this.props.helpMenu()}
            </HeaderMenu>
            <HeaderMenu
              className="--user-dropdowns"
              aria-label={<User24 fill="white" />}
              onClick={this.handleIconClick('Profile')}
            >
              {this.props.profileMenu && this.props.profileMenu()}
            </HeaderMenu>
          </HeaderNavigation>
        </Header>

        <Content
          style={{
            marginTop: '0rem',
            height: 'calc(100vh - 3rem)',
            width: '100vw',
          }}
        >
          <>
            <SideNav
              aria-label="Side navigation"
              className={classnames({
                '--hidden': this.state.isSidenavMenuActive,
              })}
            >
              <SideNavItems>
                <SideNavLink href="">Home</SideNavLink>
                <SideNavLink href="">Launchpad</SideNavLink>
                <SideNavLink href="">Platform Services</SideNavLink>
                <SideNavLink href="">Link</SideNavLink>
                <SideNavLink href="">Link</SideNavLink>
                <SideNavLink href="">Link</SideNavLink>
                <SideNavMenu defaultExpanded isActive title="Platform Services">
                  <SideNavMenuItem href="">Control Center</SideNavMenuItem>
                  <SideNavMenuItem aria-current="page" href="">
                    CI
                  </SideNavMenuItem>
                  <SideNavMenuItem href="">Scorecard</SideNavMenuItem>
                </SideNavMenu>
              </SideNavItems>
            </SideNav>
            {this.props.children}
          </>
        </Content>
      </>
    );
  }
}

export default UIShell;
