import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LeftSideNav, SideNavItems, SideNavLink, UIShell } from "@boomerang-io/carbon-addons-boomerang-react";
import { AppPath } from "Config/appConfig";
import { SideNav } from "carbon-components-react";
import { BASE_LAUNCH_ENV_URL } from "Config/platformUrlConfig";
import { BASE_URL } from "Config/servicesConfig";

const defaultUIShellProps = {
  baseServiceUrl: BASE_URL,
  renderLogo: false,
  baseLaunchEnvUrl: BASE_LAUNCH_ENV_URL,
};

const activeClassName = "bx--side-nav__link--current";

const skipToContentProps = {
  href: "#content",
};

Navbar.propTypes = {
  //handleOnTutorialClick: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  user: PropTypes.object,
};

function Navbar(props) {
  const { navigation, user } = props;

  if (navigation) {
    return (
      <>
        <Helmet>
          <title>{`Starter | ${navigation?.platform?.platformName ?? "Boomerang"}`}</title>
        </Helmet>
        <UIShell
          {...defaultUIShellProps}
          headerConfig={navigation}
          user={user}
          onTutorialClick={props.handleOnTutorialClick}
          renderLogo={navigation?.platform?.displayLogo}
          companyName={navigation?.platform?.platformName}
          skipToContentProps={skipToContentProps}
          onMenuClick={({ isOpen, onMenuClose }) => (
            <LeftSideNav isOpen={isOpen}>
              <SideNav aria-label="sidenav" expanded={isOpen} isChildOfHeader={true}>
                <SideNavItems>
                  <SideNavLink
                    exact
                    large
                    activeClassName={activeClassName}
                    element={NavLink}
                    onClick={onMenuClose}
                    to={AppPath.Root}
                    key="/"
                  >
                    Home
                  </SideNavLink>
                  <SideNavLink
                    large
                    activeClassName={activeClassName}
                    element={NavLink}
                    onClick={onMenuClose}
                    to={AppPath.Users}
                    key="/users"
                  >
                    Users
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </LeftSideNav>
          )}
        />
      </>
    );
  }

  return <UIShell {...defaultUIShellProps} />;
}

export default Navbar;
