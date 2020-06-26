import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from 'carbon-components-react';

import ConfirmModal from './ConfirmModal';

storiesOf('ConfirmModal', module)
  .add('default', () => {
    return (
      <ConfirmModal
        affirmativeAction={action('confirm modal affirmative action')}
        appElement="#root"
        label="do things"
        title="Yeah?"
        modalTrigger={({ openModal }) => <Button onClick={openModal}>Open confirm modal</Button>}
      >
        <div>stuff here</div>
      </ConfirmModal>
    );
  })
  .add('initially open', () => {
    return (
      <ConfirmModal
        affirmativeAction={action('confirm modal affirmative action')}
        appElement="#root"
        label="delete things"
        title="Huh?"
        isOpen
        modalTrigger={({ openModal }) => <Button onClick={openModal}>Open confirm modal</Button>}
      />
    );
  });
