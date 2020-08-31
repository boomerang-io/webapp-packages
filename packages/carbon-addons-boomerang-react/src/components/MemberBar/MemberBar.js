import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Avatar from '../Avatar';
import { CloseOutline32 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

function MemberBar({ avatarSrc, email, id, name, removeUser, addUser, isDetail = false }) {
  return (
    <li>
      <button
        className={cx(`${prefix}--bmrg-member-bar`, {
          [`${prefix}--bmrg-member-bar--detail`]: isDetail,
        })}
        onClick={addUser ? () => addUser(id) : removeUser ? () => removeUser(id) : () => {}}
        type="button"
      >
        <div className={`${prefix}--bmrg-member-bar__user`}>
          <Avatar src={avatarSrc} />
          <div className={`${prefix}--bmrg-member-bar__data`}>
            <p className={`${prefix}--bmrg-member-bar__name`}>{name}</p>
            <p className={`${prefix}--bmrg-member-bar__email`}>{email}</p>
          </div>
        </div>
        {removeUser && (
          <CloseOutline32
            className={`${prefix}--bmrg-member-bar__close-icon`}
            alt="remove user"
            data-testid="remove-user-button"
          />
        )}
      </button>
    </li>
  );
}

MemberBar.propTypes = {
  avatarSrc: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  removeUser: PropTypes.func,
  addUser: PropTypes.func,
  isDetail: PropTypes.bool,
};

export default MemberBar;
