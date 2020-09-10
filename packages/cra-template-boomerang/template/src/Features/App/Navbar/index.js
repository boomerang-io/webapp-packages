import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";
import { BASE_LAUNCH_ENV_URL } from "Config/platformUrlConfig";
import { BASE_URL } from "Config/servicesConfig";

const defaultUIShellProps = {
  baseServiceUrl: BASE_URL,
  renderLogo: false,
  baseLaunchEnvUrl: BASE_LAUNCH_ENV_URL,
};

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
          <title>{`Onboargind project | ${navigation?.platform?.platformName ?? "Boomerang"}`}</title>
        </Helmet>
        <UIShell
          {...defaultUIShellProps}
          headerConfig={navigation}
          user={user}
          requirePlatformConsent={false}
          onTutorialClick={props.handleOnTutorialClick}
          renderLogo={navigation?.platform?.displayLogo}
          companyName={navigation?.platform?.platformName}
          skipToContentProps={skipToContentProps}
        />
      </>
    );
  }

  return <UIShell {...defaultUIShellProps} />;
}

export default Navbar;
