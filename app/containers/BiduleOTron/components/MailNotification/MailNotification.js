
import React from 'react';
import styled, { keyframes } from 'styled-components';

import Icon from './icone_message.svg';

const animation = keyframes`
from {
  transform: scale(1);
}
25% {
  transform: scale(1.2);
}
50 {
  transform: scale(1);
}
`;

const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
  z-index: 10;

  &.animated {
    animation: ${animation} 1s ease-out infinite;
  }
`;

export default function ({ animated }) {
  return (
    <Wrapper className={animated !== false ? 'animated' : ''}>
      <Icon />
    </Wrapper>
  )
}