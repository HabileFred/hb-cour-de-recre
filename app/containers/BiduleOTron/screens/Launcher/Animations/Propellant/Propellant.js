import React from 'react';
import styled, { keyframes } from 'styled-components';

import ImagePropellant from './propulseur.svg';

const animation = keyframes`
from {
  transform: scaleY(1);
}
50% {
  transform: scaleY(0.9);
}
to {
  transform: scaleY(1);
}
`;

const Wrapper = styled.div`
position: absolute;
left: 325px;
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