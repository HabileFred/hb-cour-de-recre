import React from 'react';
import styled from 'styled-components';

import ImageAntenna from './antenne.svg';

const AntennaWrapper = styled.div`
  position: absolute;
  left: 720px;
  top: 253px;
  width: 32px;
  height: 57px;
  z-index: 2;
`;

export default function Antenna() {
  return (
    <AntennaWrapper>
      <ImageAntenna />
    </AntennaWrapper>
  );
}
