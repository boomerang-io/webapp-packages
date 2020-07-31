import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import "typeface-ibm-plex-sans";

addDecorator(withKnobs);
addDecorator(withInfo);
