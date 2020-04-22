import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import ImageTransmission from './transmission.svg';
import theme from 'BOT/Theme';
import { SFX } from 'BOT/SoundManager';

const sparkleAnim = keyframes`
from {
  stroke-width: .8px;
}
50% {
  stroke-width: 3px;
}
to {
  stroke-width: .8px;
}
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 350px;
  top: 133px;
  width: 169px;
  height: 167px;
  z-index: 2;
  filter: drop-shadow(2px -2px 3px rgba(0,0,0,0.4));

  svg path[class$="sparkle"] {
    display: none;
    fill: ${theme.ui.violet};
    stroke: ${theme.ui.violet};
    stroke-width: 2px;
  }

  &.sparkling svg path[class$="sparkle"] {
    display: block;
  }

  &.animated svg path[class$="circle-left"],
  &.animated svg path[class$="circle-right"] {
    fill: ${theme.ui.violet};
    stroke: ${theme.ui.violet};
    stroke-width: .8px;
    animation: ${sparkleAnim} 1s infinite;
  }
`;

function Transmission({ animated }) {

  let timer1;
  let timer2;

  const [sparkling, setSparkling] = useState(false);

  function doSparkle() {
    setSparkling(true);
    timer2 = window.setTimeout(() => setSparkling(false), 300 + Math.random() * 500);
    timer1 = window.setTimeout(doSparkle, 7000 + Math.random() * 10000);
  }

  useEffect(() => {
    if (animated) {
      doSparkle();
    } else {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
    }
    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
    };
  }, [animated]);

  return (
    <Wrapper className={classnames({ animated, sparkling })}>
      <ImageTransmission />
    </Wrapper>
  )
}

export default Transmission;