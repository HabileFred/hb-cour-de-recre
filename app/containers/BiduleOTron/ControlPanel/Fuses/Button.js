import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;
  margin-bottom: -8px;

  path.bouton_fusible_svg__lever {
    transition: transform 150ms ease-in-out;
    transform-origin: 20px 20px;
  }

  &.left path.bouton_fusible_svg__lever {
    transform: rotate(-75deg);
  }
`;

import SVGImage from './bouton_fusible.svg';

function Button({ onClick, value }) {
  return (
    <Wrapper type="button" onClick={onClick} className={value === 'D' ? 'right' : 'left'}>
      <SVGImage />
    </Wrapper>
  );
}

export default Button;
