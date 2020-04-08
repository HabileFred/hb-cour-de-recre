import React from 'react';
import styled from 'styled-components';

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
  left: 511px;
  top: 359px;
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

// Hublot
export const Porthole = styled(Animation)`
  left: 361px;
  top: 302px;
  width: 157px;
  height: 168px;
  z-index: 1;
  background-image: url('${props => imgPorthole[props.status || 'back']}');
`;

export const Transmission = styled(Animation)`
  left: 350px;
  top: 133px;
  width: 169px;
  height: 167px;
  z-index: 2;
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
