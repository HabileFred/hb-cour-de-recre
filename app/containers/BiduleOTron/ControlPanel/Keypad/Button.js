import React from 'react';
import styled from 'styled-components';

import SVGImageDefault from './img/bouton_chiffre.svg';
import SVGImageActive from './img/bouton_chiffre_on.svg';

import { Digit } from 'BOT/components/Digits/Digits';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;
  position: relative;

  .default,
  .active {
    position: absolute;
    top: 0;
    left: 0;
  }

  .digit {
    position: absolute;
    top: -3px;
    left: 14px;
  }

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
    .digit {
      position: absolute;
      top: -1px;
      left: 14px;
    }
  }
`;

function Button({ onClick, code }) {
  return (
    <Wrapper type="button" onClick={onClick}>
      <SVGImageDefault className={`default`}/>
      <SVGImageActive className={`active`}/>
      <Digit className="digit" color="white" size={15} d={code}/>
    </Wrapper>
  );
}

export default Button;
