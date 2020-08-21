import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const FeatureNavTab = ({ activeClassName, className, style, label, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-feature-nav-tab`, className);
  const activeClassNames = classnames(`${prefix}--bmrg-feature-nav-tab--active`, activeClassName);

  return (
    <NavLink className={classNames} activeClassName={activeClassNames} style={style} {...rest}>
      {label}
    </NavLink>
  );
};

FeatureNavTab.defaultProps = {
  activeClassName: '',
  className: '',
  label: '',
};

FeatureNavTab.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
};

export default FeatureNavTab;
