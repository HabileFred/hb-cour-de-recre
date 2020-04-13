import React from 'react';
import styled, { keyframes } from 'styled-components';

import imgCable1 from './img/cable1.gif';
import imgCable2 from './img/cable2.gif';
import imgTransmissionAnimated from './img/transmission_anime.gif';
import imgTransmissionFixed from './img/transmission_fixe.png';

import imgPipeAnimated from './img/tuyaux_anime.gif';
import imgPipeFixed from './img/tuyaux_fixe.png';

import imgBarometer from './img/barometre.gif';

import imgPropellantFixed from './img/propulseur_fixe.png';
import imgPropellantAnimated from './img/propulseur_anime.gif';

import imgAntenna from './img/antenne.gif';

import imgPortholeBack from './img/hublot_fond.png';
import imgPortholeEmpty from './img/hublot_vide.png';
import imgPortholeBidule from './img/hublot_bidule.png';
const imgPorthole = {
  back: imgPortholeBack,
  empty: imgPortholeEmpty,
  bidule: imgPortholeBidule,
};
import imgBidule from './img/bidule.png';

const Animation = styled.div`
  position: absolute;
  background: top left no-repeat;
`;

export const Cable1 = styled(Animation)`
  left: 505px;
  top: 138px;
  width: 72px;
  height: 208px;
  z-index: 4;
  background-image: ${props => props.animated ? ("url('" + imgCable1 + "')") : 'none'};
`;

export const Cable2 = styled(Animation)`
  left: 512px;
  top: 357px;
  width: 157px;
  height: 168px;
  z-index: 4;
  background-image: ${props => props.animated ? ("url('" + imgCable2 + "')") : 'none'};
`;

export const Pipe = styled(Animation)`
  left: 915px;
  top: 150px;
  width: 184px;
  height: 348px;
  z-index: 3;
  background-image: url('${props => props.animated ? imgPipeAnimated : imgPipeFixed}');
`;

export const Barometer = styled(Animation)`
  left: 576px;
  top: 315px;
  width: 86px;
  height: 66px;
  z-index: 3;
  background-image: url('${imgBarometer}');
`;

// Propulseur
export const Propellant = styled(Animation)`
  left: 295px;
  top: 30px;
  width: 247px;
  height: 316px;
  z-index: 0;
  background-image: url('${props => props.animated ? imgPropellantAnimated : imgPropellantFixed}');
`;

const biduleAnimations = {
  launch: {
    duration: '1300ms',
    iteration: 1,
    animation: keyframes`
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
  }`,
  },

  shake: {
    duration: '800ms',
    iteration: 'infinite',
    animation: keyframes`
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
  }`
  }
};

// Hublot
export const Porthole = styled(Animation)`
  left: 361px;
  top: 302px;
  width: 157px;
  height: 168px;
  z-index: 1;
  background-image: url('${imgPortholeEmpty}');

  &::before {
    content: "";
    display: ${props => props.status === 'bidule' ? 'block' : 'none'};
    z-index: -1;
    position: relative;
    top: 0;
    left: 0;
    width: 167px;
    height: 166px;
    background: url('${imgBidule}') no-repeat;
    animation-name: ${props => props.animation ? biduleAnimations[props.animation].animation : 'none'};
    animation-duration: ${props => props.animation ? biduleAnimations[props.animation].duration : '0s'};
    animation-iteration-count: ${props => props.animation ? biduleAnimations[props.animation].iteration : 1};
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
  }
`;

export const Transmission = styled(Animation)`
  left: 350px;
  top: 133px;
  width: 169px;
  height: 167px;
  z-index: 2;
  filter: drop-shadow(2px -2px 3px rgba(0,0,0,0.4));
  background-image: url('${props => props.animated ? imgTransmissionAnimated : imgTransmissionFixed}');
`;

export const Antenna = styled(Animation)`
  left: 720px;
  top: 253px;
  width: 32px;
  height: 57px;
  z-index: 2;
  background-image: url('${imgAntenna}');
`;
