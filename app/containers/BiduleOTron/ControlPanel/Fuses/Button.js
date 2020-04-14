import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;
  margin-bottom: -8px;
`;

import SVGImageRight from './img/bouton_fusible_droite.svg';
import SVGImageLeft from './img/bouton_fusible_gauche.svg';

function Button({ onClick, value }) {
  return (
    <Wrapper type="button" onClick={onClick}>
      {value === 'D'
        ? (<SVGImageRight />)
        : (<SVGImageLeft />)
      }
    </Wrapper>
  );
}

export default Button;
