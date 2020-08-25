import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const BreadcrumbNav = ({ className, navItems, ...rest }) => {
  return (
    <Breadcrumb {...rest}>
      {navItems.map((navItem) => {
        const { className = '', label, ...navItemProps } = navItem;
        return navItem.href ? (
          <BreadcrumbItem {...navItemProps}>{navItem.label}</BreadcrumbItem>
        ) : (
          <li>
            <p
              className={classnames(`${prefix}--bmrg-breadcrumb-nav-text`, className)}
              {...navItemProps}
            >
              {navItem.label}
            </p>
          </li>
        );
      })}
    </Breadcrumb>
  );
};

BreadcrumbNav.defaultProps = {
  className: '',
};

BreadcrumbNav.propTypes = {
  className: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
};

export default BreadcrumbNav;
