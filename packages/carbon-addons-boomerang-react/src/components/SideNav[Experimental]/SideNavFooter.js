import { Close20, ChevronRight20 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

/**
 * SideNavFooter is used for rendering the button at the bottom of the side
 * navigation that is a part of the UI Shell. It is responsible for handling the
 * user interaction to expand or collapse the side navigation.
 */
const SideNavFooter = ({ assistiveText, className: customClassName, isExpanded, onToggle }) => {
  const className = cx(`${prefix}--side-nav__footer`, customClassName);
  return (
    <footer className={className}>
      <button
        className={`${prefix}--side-nav__toggle`}
        type="button"
        onClick={onToggle}
        title={assistiveText}
      >
        <div className={`${prefix}--side-nav__icon`}>
          {isExpanded ? <Close20 /> : <ChevronRight20 />}
        </div>
        <span className={`${prefix}--assistive-text`}>{assistiveText}</span>
      </button>
    </footer>
  );
};

SideNavFooter.propTypes = {
  /**
   * Provide text to be read to screen readers and shown as a tooltip when
   * interacting with the toggle button in the footer
   */
  assistiveText: PropTypes.string.isRequired,

  /**
   * Specify whether the side navigation is expanded or collapsed
   */
  isExpanded: PropTypes.bool.isRequired,

  /**
   * Provide a function that is called when the toggle button is interacted
   * with. Useful for controlling the expansion state of the side navigation.
   */
  onToggle: PropTypes.func.isRequired,
};

SideNavFooter.defaultProps = {
  assistiveText: 'Toggle opening or closing the side navigation',
};

export default SideNavFooter;
