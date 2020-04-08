import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import withFocus from '../../../withFocus';

import imgStability1 from './img/stabilite_1.png';
import imgStability2 from './img/stabilite_2.png';
import imgStability3 from './img/stabilite_3.png';
import imgStability4 from './img/stabilite_4.png';
const imgStability = [
  null,
  imgStability1,
  imgStability2,
  imgStability3,
  imgStability4,
];

import imgVelocity0 from './img/carre_orange.png';
import imgVelocity1 from './img/carre_bleu.png';
import imgVelocity2 from './img/carre_jaune.png';
import imgVelocity3 from './img/carre_rose.png';
import imgVelocity4 from './img/carre_violet.png';
const imgVelocity = [
  imgVelocity0,
  imgVelocity1,
  imgVelocity2,
  imgVelocity3,
  imgVelocity4,
  ];

const Wrapper = styled.div`
  position: absolute;
  left: 793px;
  top: 136px;
  width: 175px;
  height: 310px;
  z-index: 5;
`;

const ParamsInfos = styled.div`
  position: absolute;
  left: 6px;
  top: 182px;
  width: 160px;
  height: 116px;
  background: white;
  transition: opacity 250ms linear;
  opacity: ${props => props.revealed ? 0 : 1};
`;

const StabilityItem = styled.div`
  position: absolute;
  left: ${props => 23 + props.index * 12}px;
  top: 52px;
  width: 14px;
  height: 38px;
  background: top center no-repeat url('${props => imgStability[props.value]}');
`;

const VelocityItem = styled.div`
  position: absolute;
  left: ${props => 30 + props.index * 15}px;
  top: 19px;
  width: 14px;
  height: 15px;
  background: top center no-repeat url('${props => imgVelocity[props.value]}');
`;

const Params = function({ params, focused, solved }) {
  return (
    <Wrapper className={classnames({ focused, solved })}>
      <ParamsInfos revealed={focused} />
      {params.stability.values.map((v, i) => (<StabilityItem key={i} index={i} value={v} />))}
      {params.velocity.values.map((v, i) => (<VelocityItem key={i} index={i} value={v} />))}
    </Wrapper>
  );
};

export default withFocus(Params);