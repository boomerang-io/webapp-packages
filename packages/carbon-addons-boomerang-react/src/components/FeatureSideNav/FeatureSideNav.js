import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

FeatureSideNav.propTypes = {
  border: PropTypes.oneOf(['left', 'right', undefined]),
  small: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
};

const { prefix } = settings;

export function FeatureSideNav(props) {
  const { border, small, children, className, ...rest } = props;
  return (
    <div
      className={cx(`${prefix}--bmrg-feature-sidenav-container`, className, {
        '--left-border': border === 'left',
        '--right-border': border === 'right',
        '--small': small,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export default FeatureSideNav;
