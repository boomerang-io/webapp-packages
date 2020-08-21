import React from 'react';
import { storiesOf } from '@storybook/react';
import MemberBar from './MemberBar';

storiesOf('MemberBar', module).add('default', () => {
  return (
      <MemberBar
        key="1" 
        id="1" 
        name="Test User" 
        email="testuser@ibm.com"
        baseServiceUrl="heep://test.com"
        isDetail
      />
  );
});
