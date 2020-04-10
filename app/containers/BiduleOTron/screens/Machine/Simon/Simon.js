import React, { useEffect } from 'react';
import styled from 'styled-components';
import withFocus from '../../../withFocus';
import classnames from 'classnames';

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

  let timer;

  const sequencer = () => {
    console.log("simon sequencer");
  };

  const startSequencer = () => {
    console.log("starting timer for Simon");
    timer = window.setInterval(sequencer, 2000);
  };

  const stopSequencer = () => {
    if (timer) {
      console.log("stopping timer for Simon");
      window.clearInterval(timer);
      timer = null;
    }
  };

  useEffect(() => {
    if (focused) {
      startSequencer();
    } else {
      stopSequencer();
    }
    return stopSequencer;
  }, [focused]);

  return (
    <MachineSimonContainer className={classnames({ focused })}>
    </MachineSimonContainer>
  );
};

export default withFocus(MachineSimon);