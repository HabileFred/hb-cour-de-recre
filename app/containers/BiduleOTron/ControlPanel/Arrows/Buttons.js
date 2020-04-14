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

import ImageLeftOff from './img/bouton_fleche_gauche_off.svg';
import ImageLeftOn from './img/bouton_fleche_gauche_on.svg';
import ImageRightOff from './img/bouton_fleche_droite_off.svg';
import ImageRightOn from './img/bouton_fleche_droite_on.svg';
import ImageUpOff from './img/bouton_fleche_haut_off.svg';
import ImageUpOn from './img/bouton_fleche_haut_on.svg';
import ImageDownOff from './img/bouton_fleche_bas_off.svg';
import ImageDownOn from './img/bouton_fleche_bas_on.svg';

export function ButtonLeft(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageLeftOff className="default"/>
      <ImageLeftOn className="active"/>
    </Wrapper>
  );
}

export function ButtonRight(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageRightOff className="default"/>
      <ImageRightOn className="active"/>
    </Wrapper>
  );
}

export function ButtonUp(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageUpOff className="default"/>
      <ImageUpOn className="active"/>
    </Wrapper>
  );
}

export function ButtonDown(props) {
  return (
    <Wrapper type="button" {...props}>
      <ImageDownOff className="default"/>
      <ImageDownOn className="active"/>
    </Wrapper>
  );
}
