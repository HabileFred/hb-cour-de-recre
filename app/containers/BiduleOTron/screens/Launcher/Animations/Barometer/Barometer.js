import React from 'react';
import styled from 'styled-components';

import ImageBarometer from './barometre.svg';

const BarometerWrapper = styled.div`
  position: absolute;
  left: 576px;
  top: 315px;
  width: 86px;
  height: 66px;
  z-index: 3;
`;

export default function Barometer() {
  return (
    <BarometerWrapper>
      <ImageBarometer />
    </BarometerWrapper>
  );
}
