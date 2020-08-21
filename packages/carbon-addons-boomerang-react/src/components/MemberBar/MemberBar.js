import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';
import Avatar from '../Avatar';
import { CloseOutline32 } from "@carbon/icons-react";

const { prefix } = settings;

export default function MemberBar({ email, id, baseServiceUrl, name, removeUser, addUser, isDetail = false }) {
  return (
    <button
      className={cx(`${prefix}--bmrg-member-bar-container`, { "--is-detail": isDetail })}
      onClick={addUser ? () => addUser(id) : removeUser ? () => removeUser(id) : () => {}}
      type="button"
    >
      <div className={`${prefix}--bmrg-member-bar-user-row`}>
        <Avatar src={`${baseServiceUrl}/users/image/${email}`} />
        <div className={`${prefix}--bmrg-member-bar-text-container`}>
          <p className={`${prefix}--bmrg-member-bar-name`}>{name}</p>
          <p className={`${prefix}--bmrg-member-bar-email`}>{email}</p>
        </div>
      </div>
      {removeUser && (
        <CloseOutline32 className={`${prefix}--bmrg-member-bar-close-icon`} alt="remove user" data-testid="remove-user-button" />
      )}
    </button>
  );
}
