import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  buttonPressed,
} from '../../actions';

import Button from './Button';

const colors = ['purple', 'pink', 'red', 'orange', 'blue', 'green'];

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 54px);
  grid-gap: 4px;
  grid-auto-rows: 29px;
  position: absolute;
  bottom: 32px;
  left: 460px;
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
    <Wrapper>
      {['g', 'h', 'j', 'k', 'l', 'm'].map((l, i) => (
        <Button key={l} color={grayscale ? 'gray' : colors[i]} onClick={() => dispatch(buttonPressed(l))} />
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
