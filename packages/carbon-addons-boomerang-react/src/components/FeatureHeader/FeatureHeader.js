import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

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
  nav: PropTypes.node,
  includeBorder: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.node,
};

export function FeatureHeader({
  actions,
  children,
  className,
  contentClassName,
  footerClassName,
  titleClassName,
  footer,
  nav,
  includeBorder,
  style,
  subtitle,
  title,
  ...rest
}) {
  const containerClassNames = classnames(`${prefix}--bmrg-feature-header`, className);
  const contentClassNames = classnames(`${prefix}--bmrg-feature-header__content`, contentClassName);
  const titleGroupClassNames = classnames(`${prefix}--bmrg-feature-header__group`, titleClassName);
  const footerClassNames = classnames(`${prefix}--bmrg-feature-header__footer`, footerClassName);
  const additionalStyle = includeBorder ? { borderBottom: '0.0625rem solid #c1c7cd' } : {};

  return (
    <header className={containerClassNames} style={{ ...additionalStyle, ...style }} {...rest}>
      <section className={contentClassNames}>
        {nav}
        {title && <hrgroup className={titleGroupClassNames}>{title}</hrgroup>}
        {children}
        <div className={footerClassNames}>{footer}</div>
      </section>
      {actions}
    </header>
  );
}

FeatureHeaderTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  element: PropTypes.string,
  includeBorder: PropTypes.bool,
};

export function FeatureHeaderTitle({
  element: Element = 'h1',
  children,
  className,
  styles,
  ...rest
}) {
  const classNames = classnames(`${prefix}--bmrg-feature-header-text`, className);
  return (
    <Element className={classNames} {...rest}>
      {children}
    </Element>
  );
}

export function FeatureHeaderSubtitle(props) {
  return <FeatureHeaderTitle element="h2" {...props} />;
}
