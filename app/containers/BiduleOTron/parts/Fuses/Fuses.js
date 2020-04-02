import React from 'react';
import styled from 'styled-components';
import withFocus from '../../withFocus';

import imgFocus from './img/fusibles_focus.png';
import imgError from './img/indicateur_erreur.png';
import imgOK from './img/indicateur_juste.png';

const MachineFusesContainer = styled.div`
  position: absolute;
  top: 126px;
  left: 749px;
  width: 176px;
  height: 68px;
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
    width: 176px;
    height: 68px;
    background: url(${imgFocus}) no-repeat top left;
  }

  &.solved {
    opacity: 1;
  }
`;

const MachineFuses = function({ fuses, focused }) {
  return (
    <MachineFusesContainer className={`${focused ? 'focused' : ''}`}>
    </MachineFusesContainer>
  );
};

export default withFocus(MachineFuses);