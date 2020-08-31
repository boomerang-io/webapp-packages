import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { SkeletonPlaceholder } from 'carbon-components-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const FeatureNavTab = ({ activeClassName, className, style, label, loading, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-feature-nav-tab`, className);
  const activeClassNames = classnames(`${prefix}--bmrg-feature-nav-tab--active`, activeClassName);

  return loading ? (
    <div className={`${prefix}--bmrg-feature-nav-tab--loading`}>
      <SkeletonPlaceholder className={`${prefix}--bmrg-feature-nav-tab--loading__skeleton`} />
    </div> 
  ) : (
    <NavLink className={classNames} activeClassName={activeClassNames} style={style} {...rest}>
      {label}
    </NavLink>
  );
};

FeatureNavTab.defaultProps = {
  activeClassName: '',
  className: '',
  label: '',
  loading: false
};

FeatureNavTab.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.object,
};

export default FeatureNavTab;
