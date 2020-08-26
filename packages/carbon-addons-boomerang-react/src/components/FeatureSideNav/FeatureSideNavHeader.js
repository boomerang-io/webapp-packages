import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

FeatureSideNavHeader.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

const { prefix } = settings;

export function FeatureSideNavHeader(props) {
  const { children, className, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-header`, className)} {...rest}>
      {children}
    </section>
  );
}

export default FeatureSideNavHeader;
