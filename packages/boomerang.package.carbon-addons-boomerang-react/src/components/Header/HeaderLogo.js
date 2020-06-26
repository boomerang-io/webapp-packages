import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const HeaderLogo = (props) => {
  const { className, companyName, navLinks, productName, children, ...other } = props;

  const HeaderLogoClasses = classNames(`${prefix}--bmrg-header-brand`, className);

  return (
    <div className={HeaderLogoClasses} {...other}>
      {children}
      {(companyName || productName) && (
        <h1 className={`${prefix}--bmrg-header-brand__text`}>
          {companyName}
          {companyName && productName ? (
            <span className={`${prefix}--bmrg-header-brand__divider --small`}>&nbsp; | &nbsp;</span>
          ) : (
            ''
          )}
          <span>{productName}</span>
        </h1>
      )}
      {(companyName || productName) && Array.isArray(navLinks) && navLinks.length > 0 ? (
        <span className={`${prefix}--bmrg-header-brand__divider --large`}>|</span>
      ) : null}
    </div>
  );
};

HeaderLogo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  companyName: PropTypes.string,
  href: PropTypes.string,
  navLinks: PropTypes.array,
  productName: PropTypes.string,
};

HeaderLogo.defaultProps = {};

export default HeaderLogo;
