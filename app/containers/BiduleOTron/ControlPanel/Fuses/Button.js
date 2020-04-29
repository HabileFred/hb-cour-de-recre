import React from 'react';
import styled from 'styled-components';

import SVGImage from './bouton_fusible.svg';

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

  &.position-G path.bouton_fusible_svg__lever {
    transform: rotate(-76deg);
  }
  &.position-D path.bouton_fusible_svg__lever {
    transform: rotate(0deg);
  }
  &.position-M path.bouton_fusible_svg__lever {
    transform: rotate(-38deg);
  }
`;

function Button({ onClick, value }) {
  return (
    <Wrapper type="button" onClick={onClick} className={`position-${value}`}>
      <SVGImage />
    </Wrapper>
  );
}

export default Button;
