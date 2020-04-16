import React from 'react';
import styled from 'styled-components';

import ImageWire1 from './fil_elec1.svg';
import ImageWire2 from './fil_elec2.svg';

const Wire1Wrapper = styled.div`
  position: absolute;
  left: 348px;
  top: 151px;
  width: 220px;
  height: 230px;
  z-index: 4;

  path[class$="sparkle"] {
    display: ${props => props.animated ? 'block' : 'none'};
  }
`;

const Wire2Wrapper = styled.div`
  position: absolute;
  left: 519px;
  top: 367px;
  z-index: 4;

  path[class$="sparkle"] {
    display: ${props => props.animated ? 'block' : 'none'};
  }
`;

export default function ElectricWire({ w, animated, ...props }) {
  switch (w) {
    case 1:
      return (
        <Wire1Wrapper animated={animated} {...props}>
          <ImageWire1 />
        </Wire1Wrapper>
      );
    case 2:
      return (
        <Wire2Wrapper animated={animated} {...props}>
         <ImageWire2 />
        </Wire2Wrapper>
      );
    default:
      return null;
  }
}
