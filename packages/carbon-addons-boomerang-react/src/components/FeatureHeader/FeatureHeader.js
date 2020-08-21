import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import { default as Tabs } from '../FeatureNavTabs';
import { default as Tab } from '../FeatureNavTab';
import BreadcrumbNav from '../BreadcrumbNav';

const { prefix } = settings;

const FeatureHeader = ({
  children,
  className,
  includeBorder,
  navItems,
  tabs,
  tabsProps,
  style,
  ...rest
}) => {
  const classNames = classnames(`${prefix}--bmrg-feature-header`, className);
  const additionalStyle = includeBorder ? { borderBottom: '0.0625rem solid #c1c7cd' } : {};

  return (
    <header className={classNames} style={{ ...additionalStyle, ...style }} {...rest}>
      {navItems.length ? <BreadcrumbNav navItems={navItems} /> : null}
      {children}
      {tabs.length ? (
        <Tabs {...tabsProps}>
          {tabs.map((tab) => (
            <Tab {...tab} />
          ))}
        </Tabs>
      ) : null}
    </header>
  );
};

FeatureHeader.defaultProps = {
  className: '',
  includeBorder: true,
  navItems: [],
  tabs: [],
};

FeatureHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  includeBorder: PropTypes.bool,
  navItems: PropTypes.array,
  style: PropTypes.object,
  tabs: PropTypes.array,
  tabsProps: PropTypes.object,
};

export default FeatureHeader;
