import React from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import ImageAntenna from './antenne.svg';

const animation = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

const AntennaWrapper = styled.div`
  position: absolute;
  left: 720px;
  top: 253px;
  width: 32px;
  height: 57px;
  z-index: 2;

  svg path[class$="ring1"],
  svg path[class$="ring2"],
  svg path[class$="ring3"],
  svg path[class$="ring4"] {
    opacity: 0;
  }

  &.animated svg path[class$="ring1"] {
    animation: ${animation} 1s infinite;
  }
  &.animated svg path[class$="ring2"] {
    animation: ${animation} 1s infinite;
    animation-delay: 250ms;
  }
  &.animated svg path[class$="ring3"] {
    animation: ${animation} 1s infinite;
    animation-delay: 500ms;
  }
  &.animated svg path[class$="ring4"] {
    animation: ${animation} 1s infinite;
    animation-delay: 750ms;
  }
`;

export default function Antenna({ animated }) {
  return (
    <AntennaWrapper className={classnames({ animated })}>
      <ImageAntenna />
    </AntennaWrapper>
  );
}
