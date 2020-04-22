import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import withFocus from '../../../withFocus';

import { Digits } from 'BOT/components/Digits/Digits';
import theme from 'BOT/Theme';

import ImageStability1 from './img/stabilite_1.svg';
import ImageStability2 from './img/stabilite_2.svg';
import ImageStability3 from './img/stabilite_3.svg';
import ImageStability4 from './img/stabilite_4.svg';
import ImageStability5 from './img/stabilite_5.svg';

function StabilityItem({ value }) {
  switch (value) {
    case 1:
      return (<ImageStability1 />);
    case 2:
      return (<ImageStability2 />);
    case 3:
      return (<ImageStability3 />);
    case 4:
      return (<ImageStability4 />);
    case 5:
      return (<ImageStability5 />);
    default:
      return null;
  }
}

import ImageVelocity from './img/carre_vitesse.svg';

function VelocityItem({ value }) {
  return (
    <div className={`velocity-item value-${value}`}>
      <ImageVelocity />
    </div>
  );
}

const Wrapper = styled.div`
  position: absolute;
  left: 793px;
  top: 136px;
  width: 175px;
  height: 310px;
  z-index: 5;

  .velocity-item.value-1 path[class$="fill-color"] {
    fill: ${theme.orangeLight};
  }
  .velocity-item.value-2 path[class$="fill-color"] {
    fill: ${theme.electricBlueLight};
  }
  .velocity-item.value-3 path[class$="fill-color"] {
    fill: ${theme.yellowLight};
  }
  .velocity-item.value-4 path[class$="fill-color"] {
    fill: ${theme.pinkLight};
  }
  .velocity-item.value-5 path[class$="fill-color"] {
    fill: ${theme.purpleLight};
  }
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

const Stability = styled.div`
  position: absolute;
  left: 23px;
  top: 52px;
  display: flex;
  flex-flow: row;
`;

const Velocity = styled.div`
  position: absolute;
  left: 36px;
  top: 19px;
  width: 14px;
  height: 15px;
  display: flex;
  flex-flow: row;
`;

const Direction = styled.div`
  position: absolute;
  left: 20px;
  top: 106px;
  width: 82px;
  height: 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const Params = function({ params, focused, solved }) {
  return (
    <Wrapper className={classnames({ focused, solved })}>
      <ParamsInfos revealed={focused} />
      <Stability>
        {params.stability.values.map((v, i) => (<StabilityItem key={i} value={v} />))}
      </Stability>
      <Velocity>
        {params.velocity.values.map((v, i) => (<VelocityItem key={i} index={i} value={v} />))}
      </Velocity>
      <Direction>
        <Digits margins={'-1.75px'} size={18} value={params.direction.values.join('')} />
      </Direction>
    </Wrapper>
  );
};

export default withFocus(Params);