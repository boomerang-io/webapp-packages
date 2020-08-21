import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { settings } from 'carbon-components';

FeatureSideNav.propTypes = {
  header: PropTypes.func,
  leftBorder: PropTypes.bool,
  small: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
};

const { prefix } = settings;

export function FeatureSideNav(props) {
  const { header, leftBorder, small, children, className, listClassName } = props;
  return (
    <div className={cx(`${prefix}--bmrg-feature-sidenav-container`, className,  {"--left-border": leftBorder, "--small": small })}>
      {header && header()}
      <section className={cx(`${prefix}--bmrg-feature-sidenav-links`, listClassName)}>
        {children}
      </section>
    </div>
  );
}

export default FeatureSideNav;
