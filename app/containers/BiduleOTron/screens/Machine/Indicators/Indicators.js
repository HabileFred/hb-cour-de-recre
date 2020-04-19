import React from 'react';
import styled, { keyframes } from 'styled-components';

import IndicatorOn from './img/lampe_on.svg';
import IndicatorOff from './img/lampe_off.svg';

const storeKeys = ['pieces', 'pipes', 'binary', 'simon', 'fuses', 'lights', 'wires'];

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

const IndicatorsContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 1116px;
  width: 60px;
  height: 260px;
  z-index: 0;

  .i {
    position:absolute;
  }
  .i.on {
    animation: ${onAnimation} 800ms ease-in;
  }
  ${storeKeys.reduce((acc, v, i) => {
    acc += `.i${i}{left:${i}px;top:${i * 31}px;}\n`;
    return acc;
  }, '')}
`;

const Indicators = function({ store }) {
  return (
    <IndicatorsContainer>
      {storeKeys.map((k, i) => (
        <React.Fragment key={`k${i}`}>
          <IndicatorOff className={`i i${i}`} />
          {store[k].SOLVED ? <IndicatorOn className={`i i${i} on`} /> : null}
        </React.Fragment>
      ))}
    </IndicatorsContainer>
  );
};

export default Indicators;