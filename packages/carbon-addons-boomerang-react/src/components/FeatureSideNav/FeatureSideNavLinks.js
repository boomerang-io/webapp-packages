import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

FeatureSideNavLinks.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

const { prefix } = settings;

export function FeatureSideNavLinks(props) {
  const { children, className, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-links`, className)} {...rest}>
      {children}
    </section>
  );
}

export default FeatureSideNavLinks;
