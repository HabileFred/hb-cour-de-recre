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
  padding-left: 17px;

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
    background: url('${imgFocus}') no-repeat top left;
  }

  &.solved {
    opacity: 1;
  }
`;

const Fuse = styled.div`
  width: 35px;
  height: 31px;
  background: top left no-repeat url('${props => props.on ? imgOK : imgError}');
`;

const MachineFuses = function({ fuses, focused, solved }) {
  return (
    <MachineFusesContainer className={`${focused ? 'focused' : ''} ${solved ? 'solved' : ''}`}>
      {fuses.feedback.map((on, i) => (
        <Fuse key={`f${i}`} on={on} />
      ))}
    </MachineFusesContainer>
  );
};

export default withFocus(MachineFuses);