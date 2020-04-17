import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import ImagePipe from './tuyau.svg';

const PipeWrapper = styled.div`
  position: absolute;
  left: 922px;
  top: 150px;
  width: 184px;
  height: 348px;
  z-index: 3;

  svg path[class$="fixed"] {
    display: block;
  }
  svg path[class$="animated"] {
    display: none;
  }

  &.animated svg path[class$="fixed"] {
    display: none;
  }
  &.animated svg path[class$="animated"] {
    display: block;
  }
`;

export default function Pipe({ animated }) {
  return (
    <PipeWrapper className={classnames({ animated })}>
      <ImagePipe />
    </PipeWrapper>
  );
}
