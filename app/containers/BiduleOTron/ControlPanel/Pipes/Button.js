import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;

  .default {
    display: block;
  }
  .active {
    display: none;
  }

  &:active {
    .default {
      display: none;
    }
    .active {
      display: block;
    }
  }
`;

import SVGImageDefault from './img/bouton_tuyaux.svg';
import SVGImageActive from './img/bouton_tuyaux_on.svg';

function Button({ onClick, color }) {
  return (
      <Wrapper type="button" onClick={onClick}>
        <SVGImageDefault className={`default`}/>
        <SVGImageActive className={`active`}/>
      </Wrapper>
  );
}

export default Button;
