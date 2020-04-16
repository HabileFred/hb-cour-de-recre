import React from 'react';
import styled from 'styled-components';

import ImagePipe from './tuyau.svg';

const PipeWrapper = styled.div`
  position: absolute;
  left: 915px;
  top: 150px;
  width: 184px;
  height: 348px;
  z-index: 3;
`;

export default function Barometer() {
  return (
    <PipeWrapper>
      <ImagePipe />
    </PipeWrapper>
  );
}
