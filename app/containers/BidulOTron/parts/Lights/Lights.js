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

const MachineLightsContainer = styled.div`
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

const Lights = styled.div`
  display: grid;
  grid-template-columns: 26px 3px;
  grid-gap: 0;
  grid-auto-rows: 19px;
  margin: 14px 16px;
`;

export const Light = styled.div`
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

const MachineLights = function({ focused, lights }) {
  return (
    <MachineLightsContainer className={`${focused ? 'focused' : ''}`}>
      <Lights>
        <Light className={`blue ${lights.blue ? 'on' : 'off'}`} />
        <Light className={`blue ${lights.blue ? 'on' : 'off'}`} />
        <Light className={`green ${lights.green ? 'on' : 'off'}`} />
        <Light className={`green ${lights.green ? 'on' : 'off'}`} />
        <Light className={`red ${lights.red ? 'on' : 'off'}`} />
        <Light className={`red ${lights.red ? 'on' : 'off'}`} />
        <Light className={`yellow ${lights.yellow ? 'on' : 'off'}`} />
        <Light className={`yellow ${lights.yellow ? 'on' : 'off'}`} />
        <Light className={`purple ${lights.purple ? 'on' : 'off'}`} />
        <Light className={`purple ${lights.purple ? 'on' : 'off'}`} />
      </Lights>
    </MachineLightsContainer>
  );
}

export default withFocus(MachineLights);