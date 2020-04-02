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

  &.focused {
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
  grid-template-columns: 26px 3px;
  grid-gap: 0;
  grid-auto-rows: 19px;
  margin: 14px 16px;
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

const colors = ['blue', 'red', 'green', 'yellow', 'purple'];

/**
 * The Machine with the Lightbulbs.
 * @param {Object} props
 */
const MachineLightbulbs = function({ focused, lights }) {
  return (
    <MachineLightbulbsContainer className={`${focused ? 'focused' : ''}`}>
      <Lightbulbs>
        {colors.map(color => (
          <React.Fragment>
            <Lightbulb key={`${color}1`} className={`${color} ${lights[color] ? 'on' : 'off'}`} />
            <Lightbulb key={`${color}2`} className={`${color} ${lights[color] ? 'on' : 'off'}`} />
          </React.Fragment>
        ))}
      </Lightbulbs>
    </MachineLightbulbsContainer>
  );
}

export default withFocus(MachineLightbulbs);