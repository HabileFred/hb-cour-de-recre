import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import LightbulbOff from './img/off.svg';
import LightbulbRed from './img/light_red.svg';
import LightbulbGreen from './img/light_green.svg';
import LightbulbBlue from './img/light_blue.svg';
import LightbulbPurple from './img/light_violet.svg';
import LightbulbYellow from './img/light_yellow.svg';

const MachineLightbulbsContainer = styled.div`
  position: absolute;
  top: 217px;
  left: 855px;
  width: 77px;
  height: 122px;
  opacity: 0.5;
  transition: opacity 250ms ease;

  &.focused,
  &.solved {
    opacity: 1;
  }
`;

/**
 * Groups all the Lightbulbs.
 */
const Lightbulbs = styled.div`
  display: grid;
  grid-template-columns: 21px 3px;
  grid-gap: 0;
  grid-auto-rows: 19px;
  margin: 14px 18px;
`;

/**
 * A single Lightbulb representation.
 */
function Lightbulb({ color, on }) {
  if (!on) {
    return (<LightbulbOff />);
  }
  switch (color) {
    case 'red':
      return (<LightbulbRed />);
    case 'green':
      return (<LightbulbGreen />);
    case 'blue':
      return (<LightbulbBlue />);
    case 'purple':
      return (<LightbulbPurple />);
    case 'yellow':
      return (<LightbulbYellow />);
    default:
      return (<LightbulbOff />);
  }
}

/**
 * The Machine with the Lightbulbs.
 * @param {Object} props
 */
const MachineLightbulbs = function({ focused, solved, lights }) {
  return (
    <MachineLightbulbsContainer className={classnames({ focused, solved })}>
      <Lightbulbs>
        <Lightbulb color="yellow" on={lights.values.yellow} />
        <Lightbulb color="purple" on={lights.values.purple} />
        <Lightbulb color="green" on={lights.values.green} />
        <Lightbulb color="red" on={lights.values.red} />
        <Lightbulb color="blue" on={lights.values.blue} />
        <Lightbulb color="yellow" on={lights.values.yellow} />
        <Lightbulb color="purple" on={lights.values.purple} />
        <Lightbulb color="red" on={lights.values.red} />
        <Lightbulb color="blue" on={lights.values.blue} />
        <Lightbulb color="green" on={lights.values.green} />
      </Lightbulbs>
    </MachineLightbulbsContainer>
  );
}

export default withFocus(MachineLightbulbs);