import React from 'react';
import styled from 'styled-components';

import withFocus from '../../withFocus';

import imgOff from './img/led_eteinte.png';
import imgOnBlue from './img/led_bleue.png';
import imgOnGreen from './img/led_verte.png';
import imgOnRed from './img/led_rouge.png';
import imgOnYellow from './img/led_jaune.png';
import imgOnPurple from './img/led_violette.png';
import imgmachineOnOffFocus from './img/on_off_focus.png';

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
  &.focused::before {
    content: " ";
    position: absolute;
    width: 77px;
    height: 122px;
    background: url(${imgmachineOnOffFocus}) no-repeat top left;
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
export const Lightbulb = styled.div`
  width: 20px;
  height: 20px;
  background: transparent no-repeat center center url('${imgOff}');

  &.red.on {
    background-image: url('${imgOnRed}');
  }
  &.green.on {
    background-image: url('${imgOnGreen}');
  }
  &.blue.on {
    background-image: url('${imgOnBlue}');
  }
  &.yellow.on {
    background-image: url('${imgOnYellow}');
  }
  &.purple.on {
    background-image: url('${imgOnPurple}');
  }
`;

/**
 * The Machine with the Lightbulbs.
 * @param {Object} props
 */
const MachineLightbulbs = function({ focused, solved, lights }) {
  const cls = {
    blue: `blue ${lights.values.blue ? 'on' : 'off'}`,
    green: `green ${lights.values.green ? 'on' : 'off'}`,
    red: `red ${lights.values.red ? 'on' : 'off'}`,
    yellow: `yellow ${lights.values.yellow ? 'on' : 'off'}`,
    purple: `purple ${lights.values.purple ? 'on' : 'off'}`,
  };
  return (
    <MachineLightbulbsContainer className={`${focused ? 'focused' : ''} ${solved ? 'solved' : ''}`}>
      <Lightbulbs>
        <Lightbulb className={cls.yellow} />
        <Lightbulb className={cls.purple} />
        <Lightbulb className={cls.green} />
        <Lightbulb className={cls.red} />
        <Lightbulb className={cls.blue} />
        <Lightbulb className={cls.yellow} />
        <Lightbulb className={cls.purple} />
        <Lightbulb className={cls.red} />
        <Lightbulb className={cls.blue} />
        <Lightbulb className={cls.green} />
      </Lightbulbs>
    </MachineLightbulbsContainer>
  );
}

export default withFocus(MachineLightbulbs);