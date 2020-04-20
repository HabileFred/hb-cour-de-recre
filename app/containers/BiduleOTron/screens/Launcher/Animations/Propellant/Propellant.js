import React from 'react';
import styled, { keyframes } from 'styled-components';

import ImagePropellant from './propulseur.svg';

const animation = keyframes`
from {
  transform: scale(1, 1);
}
50% {
  transform: scale(1.02, 0.9)
}
to {
  transform: scale(1, 1);
}
`;

const Wrapper = styled.div`
position: absolute;
left: 327px;
top: 144px;
width: 247px;
height: 316px;
z-index: 0;
transform-origin: top;

&.animation-starting {
  animation: ${animation} 700ms ease-in-out infinite;
}
&.animation-fast {
  animation: ${animation} 350ms ease-in-out infinite;
}
&.animation-stopping {
  animation: ${animation} 1s ease-in-out infinite;
}
`;

function Propellant({ animation }) {
  return (
    <Wrapper className={animation ? `animation-${animation}` : ''}>
      <ImagePropellant />
    </Wrapper>
  );
}

export default Propellant;