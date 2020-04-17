import React from 'react';
import styled, { keyframes } from 'styled-components';

import Bidule from 'BOT/components/Bidules/Bidules';

import ImagePorthole from './hublot_vide.svg';

const animationShake = keyframes`
0% {
  transform: rotate(0deg);
}
10% {
  transform: rotate(3deg);
}
20% {
  transform: rotate(-4deg);
}
30% {
  transform: rotate(5deg) scale(.97);
}
40% {
  transform: rotate(-5deg);
}
60% {
  transform: rotate(5deg);
}
70% {
  transform: rotate(-4deg);
}
80% {
  transform: rotate(3deg);
}
100% {
  transform: rotate(-2deg)  scale(1);
}
`;

const animationLaunch = keyframes`
10% {
  top: 3px;
}
15% {
  left: 5px;
}
50% {
  top: -30px;
  left: -4px;
}
100% {
  top: -118px;
  left: -2px;
}
`;

const PortholeWrapper = styled.div`
  position: absolute;
  left: 361px;
  top: 302px;
  width: 157px;
  height: 168px;
  z-index: 1;

  &::before {
    content: "";
    position: relative;
    display: block;
    top: 0;
    left: 0;
    width: 167px;
    height: 166px;
    background: white;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  &.animation-shake .bidule {
    animation: ${animationShake} 800ms infinite;
  }
  &.animation-launch .bidule {
    animation: ${animationLaunch} 1300ms;
    animation-fill-mode: forwards;
  }
`;

function Porthole({ bidule, animation }) {
  return (
    <PortholeWrapper className={animation ? `animation-${animation}` : ''}>
      <Bidule b={bidule} inPorthole className="bidule" />
      <ImagePorthole className="porthole" />
    </PortholeWrapper>
  );
}

export default Porthole;