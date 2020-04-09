import React from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import imgPointer from './img/aiguille.png';
import imgCursor from './img/curseur.png';

import imgOff from './img/ampoule_off.png';
import imgOn from './img/ampoule_on.png';

const Wrapper = styled.div`
  position: absolute;
  left: 600px;
  top: 170px;
  width: 120px;
  height: 116px;
`;

const rotatingPointer = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Pointer = styled.div`
  position: absolute;
  left: 48px;
  top: 51px;
  width: 56px;
  height: 40px;
  background: no-repeat center center url('${imgPointer}');
  animation: ${rotatingPointer} 2s linear infinite;
  transform-origin: 10px 10px;
  z-index: 5;
`;

const onAnimation = keyframes`
  from {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const IndicatorOff = styled.div`
  position: absolute;
  left: 829px;
  top: 66px;
  width: 54px;
  height: 62px;
  background: center center no-repeat url('${imgOff}');
`;

const IndicatorOn = styled(IndicatorOff)`
  animation: ${onAnimation} 800ms ease-in;
  background: center center no-repeat url('${imgOn}');
`;

const cursorX = [16, 37, 68, 92];
const cursorY = [28, 48, 68, 91];
const opacity = [
  0.3, 0.6, 0.6, 0.3,
  0.6, 0.8, 0.8, 0.6,
  0.6, 0.8, 0.8, 0.6,
  0.3, 0.6, 0.6, 0.3,
];
const Cursor = styled.div`
  position: absolute;
  left: ${props => cursorX[props.x]}px;
  top: ${props => cursorY[props.y]}px;
  transition: left 100ms ease-in-out, top 100ms ease-in-out;
  opacity: ${props => opacity[props.y * 4 + props.x]};
  width: 7px;
  height: 8px;
  background: no-repeat center center url('${imgCursor}');
  z-index: 3;
`;

const Radar = function({ radar, focused, solved }) {
  return (
    <React.Fragment>
      <IndicatorOff />
      {solved ? <IndicatorOn /> : null}

      <Wrapper
     className={classnames({ focused, solved })}>
        <Cursor x={radar.cursor.x} y={radar.cursor.y} />
        <Pointer />
      </Wrapper
    >
    </React.Fragment>
  );
}

export default withFocus(Radar);
