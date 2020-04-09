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

import imgVelocity0 from './img/carre_vide.png';
import imgVelocity1 from './img/carre_orange.png';
import imgVelocity2 from './img/carre_bleu.png';
import imgVelocity3 from './img/carre_jaune.png';
import imgVelocity4 from './img/carre_rose.png';
import imgVelocity5 from './img/carre_violet.png';
const imgVelocity = [
  imgVelocity0,
  imgVelocity1,
  imgVelocity2,
  imgVelocity3,
  imgVelocity4,
  imgVelocity5,
];

function importDigitsImages() {
  const r = require.context('./img/', false, /\d\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/^\.\/(\d)\.png/);;
    if (l) {
      images[l[1]] = r(key);
    }
  });
  return images;
}
const digitsImages = importDigitsImages();
import imgP from './img/p.png';
digitsImages['*'] = imgP;

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
  left: ${props => 16 + props.index * 15}px;
  top: 19px;
  width: 14px;
  height: 15px;
  background: top center no-repeat url('${props => imgVelocity[props.value]}');
`;

const Direction = styled.div`
  position: absolute;
  left: 20px;
  top: 107px;
  width: 82px;
  height: 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const Digit = styled.div`
  width: 18px;
  height: 18px;
  background: no-repeat url('${props => digitsImages[props.value]}');
  background-size: contain;
  transform: ${props => props.value === '*' ? 'none' : 'scale(.8)'};
`;


const Params = function({ params, focused, solved }) {
  return (
    <Wrapper className={classnames({ focused, solved })}>
      <ParamsInfos revealed={focused} />
      {params.stability.values.map((v, i) => (<StabilityItem key={i} index={i} value={v} />))}
      {params.velocity.values.map((v, i) => (<VelocityItem key={i} index={i} value={v} />))}
      <Direction>
        {params.direction.values.map((c,i) => <Digit key={i} value={c} />)}
      </Direction>
    </Wrapper>
  );
};

export default withFocus(Params);