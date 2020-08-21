import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const BreadcrumbNav = ({ className, navItems, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-breadcrumb-nav`, className);

  return (
    <nav className={classNames} {...rest}>
      {navItems.map((navItem) => {
        const { className, label, ...navItemProps } = navItem;
        return navItem.to ? (
          <>
            <Link
              className={classnames(`${prefix}--bmrg-breadcrumb-nav__link`, className)}
              {...navItemProps}
            >
              {navItem.label}
            </Link>
            <span className={`${prefix}--bmrg-breadcrumb-nav__breadcrumb`}>/</span>
          </>
        ) : (
          <p
            className={classnames(`${prefix}--bmrg-breadcrumb-nav__text`, className)}
            {...navItemProps}
          >
            {navItem.label}
          </p>
        );
      })}
    </nav>
  );
};

BreadcrumbNav.defaultProps = {
  className: '',
};

BreadcrumbNav.propTypes = {
  className: PropTypes.string,
  navItems: PropTypes.array.isRequired,
};

export default BreadcrumbNav;
