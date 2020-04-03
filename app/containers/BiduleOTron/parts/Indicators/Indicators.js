import React from 'react';
import styled, { keyframes } from 'styled-components';

import imgOn from './img/ampoule_on.png';
import imgOff from './img/ampoule_off.png';

const IndicatorsContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 1120px;
  width: 60px;
  height: 260px;
`;

const IndicatorOff = styled.div`
  position: absolute;
  left: ${props => props.index}px;
  top: ${props => props.index * 31}px;
  width: 48px;
  height: 42px;
  background: center center no-repeat url('${imgOff}');
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

const IndicatorOn = styled.div`
  position: absolute;
  left: ${props => props.index}px;
  top: ${props => props.index * 31}px;
  width: 48px;
  height: 42px;
  animation: ${onAnimation} 800ms ease-in;
  background: center center no-repeat url('${imgOn}');
`;

const storeKeys = ['pieces', 'fioles', 'binary', 'simon', 'fuses', 'lights', 'wires'];

const Indicators = function({ store }) {
  return (
    <IndicatorsContainer>
      {storeKeys.map((k, i) => (
        <React.Fragment key={`k${i}`}>
          <IndicatorOff index={i} />
          {store[k].SOLVED ? <IndicatorOn index={i} /> : null}
        </React.Fragment>
      ))}
    </IndicatorsContainer>
  );
};

export default Indicators;