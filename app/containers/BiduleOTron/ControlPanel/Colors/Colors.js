import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  buttonPressed,
} from '../../actions';

function importAllImages() {
  const r = require.context('./img/', false, /bouton_.*\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_([g-m])_/)[1];
    const s = key.match(/_(on|off)\.png/)[1];
    if (!images[l]) {
      images[l] = [];
    }
    images[l][s === 'on' ? 1 : 0] = r(key);
  });
  return images;
}
const images = importAllImages();

import imgFocus from './img/focus.png';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 54px);
  grid-gap: 4px;
  grid-auto-rows: 29px;
  position: absolute;
  bottom: 32px;
  left: 460px;

  button {
    filter: ${props => props.grayscale ? 'grayscale(1)' : 'none'};
  }

  &::before {
    pointer-events: none;
    content: "";
    position: absolute;
    width: 381px;
    height: 70px;
    left: -18px;
    top: -16px;
    opacity: ${props => props.focused ? 1 : 0};
    transition: opacity 250ms ease;
    background: top left no-repeat url('${imgFocus}');
  }
`;

const Button = styled.button`
  border: none;
  outline: none;
  background: center center no-repeat url('${props => images[props.letter][0]}');
  &:active {
    background-image: url('${props => images[props.letter][1]}');
  }
`;

/**
 *
 */
function ButtonGroupColors({ dispatch, focused, grayscale }) {

  const keyListener = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    switch (event.keyCode) {
      case 71:
        dispatch(buttonPressed('g'));
        break;
      case 72:
        dispatch(buttonPressed('h'));
        break;
      case 74:
        dispatch(buttonPressed('j'));
        break;
      case 75:
        dispatch(buttonPressed('k'));
        break;
      case 76:
        dispatch(buttonPressed('l'));
        break;
      case 77:
        dispatch(buttonPressed('m'));
        break;
    }
  };

  useEffect(() => {
    // Add event listener
    document.addEventListener('keyup', keyListener);
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('keyup', keyListener);
    };
  });

  return (
    <Wrapper focused={focused} grayscale={grayscale}>
      {['g', 'h', 'j', 'k', 'l', 'm'].map(l => (
        <Button key={l} type="button" letter={l} onClick={() => dispatch(buttonPressed(l))} />
      ))}
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ButtonGroupColors);
