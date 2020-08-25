import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

FeatureSideNavFooter.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

const { prefix } = settings;

export function FeatureSideNavFooter(props) {
  const { children, className, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-footer`, className)} {...rest}>
      {children}
    </section>
  );
}

export default FeatureSideNavFooter;
