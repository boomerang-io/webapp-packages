import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const FeatureHeader = ({
  actions: Actions,
  children,
  className,
  contentClassName,
  footer: Footer,
  header: Header,
  includeBorder,
  style,
  ...rest
}) => {
  const containerClassNames = classnames(`${prefix}--bmrg-feature-header`, className);
  const contentClassNames = classnames(`${prefix}--bmrg-feature-header__content`, contentClassName);
  const additionalStyle = includeBorder ? { borderBottom: '0.0625rem solid #c1c7cd' } : {};

  return (
    <header className={containerClassNames} style={{ ...additionalStyle, ...style }} {...rest}>
      <section className={contentClassNames}>
        {Header ? <Header /> : null}
        {children}
        {Footer ? <Footer /> : null}
      </section>
      {Actions ? <Actions /> : null}
    </header>
  );
};

FeatureHeader.defaultProps = {
  className: '',
  contentClassName: '',
  includeBorder: true,
};

FeatureHeader.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  footer: PropTypes.node,
  header: PropTypes.node,
  includeBorder: PropTypes.bool,
  style: PropTypes.object,
};

export default FeatureHeader;
