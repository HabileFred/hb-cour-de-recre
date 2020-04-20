import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import ImagePointer from './img/aiguille.svg';
import imgCursor from './img/curseur.png';

import ImageIndicatorOn from './img/ampoule_on.svg';
import ImageIndicatorOff from './img/ampoule_off.svg';

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

const Wrapper = styled.div`
  position: absolute;
  left: 600px;
  top: 170px;
  width: 120px;
  height: 116px;

  .indicator {
    position: absolute;
    left: 232px;
    top: -108px;
    width: 54px;
    height: 62px;
    z-index: 5;
  }
  .indicator.on {
    animation: ${onAnimation} 800ms ease-in;
  }
`;

const rotatingPointer = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PointerWrapper = styled.div`
  position: absolute;
  left: 4px;
  top: 7px;
  width: 107px;
  height: 107px;
  display: ${props => props.enabled ? 'block' : 'none'};
  animation-name: ${props => props.enabled ? rotatingPointer : 'none'};
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform-origin: 53px 53px;
  z-index: 5;
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
  display: ${props => props.enabled ? 'block' : 'none'};
  position: absolute;
  left: ${props => cursorX[props.x]}px;
  top: ${props => cursorY[props.y]}px;
  transition: left 250ms ease-in-out, top 250ms ease-in-out;
  opacity: ${props => opacity[props.y * 4 + props.x]};
  width: 7px;
  height: 8px;
  background: no-repeat center center url('${imgCursor}');
  z-index: 3;
`;

const Radar = function({ radar, focused, solved, enabled }) {

  return (
    <React.Fragment>
      <Wrapper className={classnames({ focused, solved })}>
        <ImageIndicatorOff className="indicator" />
        {solved ? <ImageIndicatorOn className="indicator on" /> : null}
        <Cursor enabled={enabled} x={radar.cursor.x} y={radar.cursor.y} />
        <PointerWrapper enabled={enabled}>
          <ImagePointer />
        </PointerWrapper>
      </Wrapper>
    </React.Fragment>
  );
}

export default withFocus(Radar);
