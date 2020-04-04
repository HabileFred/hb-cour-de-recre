import React from 'react';
import styled from 'styled-components';
import withFocus from '../../../withFocus';

import imgFocus from './img/simon_focus.png';

const MachineSimonContainer = styled.div`
  position: absolute;
  top: 256px;
  left: 749px;
  width: 119px;
  height: 253px;
  display: flex;
  flex-flow: row;
  align-items: center;
  opacity: 0;
  transition: opacity 250ms ease;

  &.focused {
    opacity: 1;
  }
  &.focused::before {
    content: " ";
    position: absolute;
    left 0;
    top: 0;
    width: 119px;
    height: 253px;
    background: url(${imgFocus}) no-repeat top left;
  }

  &.solved {
    opacity: 1;
  }
`;

const MachineSimon = function({ simon, focused }) {
  return (
    <MachineSimonContainer className={`${focused ? 'focused' : ''}`}>
    </MachineSimonContainer>
  );
};

export default withFocus(MachineSimon);