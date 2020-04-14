import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  padUp,
  padLeft,
  padRight,
  padDown,
} from '../../actions';

const width = 138;
const height = 110;

const sizes = {
  haut: [43, 4],
  bas: [43, 64],
  gauche: [0, 33],
  droite: [85, 33],
};

import { ButtonLeft, ButtonRight, ButtonUp, ButtonDown } from './Buttons';

const Wrapper = styled.section`
  position: absolute;
  bottom: 15px;
  left: 43px;
  width: ${width}px;
  height: ${height}px;
`;

/**
 *
 */
function ButtonGroupArrows({ dispatch }) {

  const keyListener = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    switch (event.keyCode) {
      case 37:
        dispatch(padLeft());
        break;
      case 38:
        dispatch(padUp());
        break;
      case 39:
        dispatch(padRight());
        break;
      case 40:
        dispatch(padDown());
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
      <ButtonUp
        style={{ position: 'absolute', top: `${sizes.haut[1]}px`, left: `${sizes.haut[0]}px` }}
        onClick={() => dispatch(padUp())}
      />
      <ButtonLeft
        style={{ position: 'absolute', top: `${sizes.gauche[1]}px`, left: `${sizes.gauche[0]}px` }}
        onClick={() => dispatch(padLeft())}
      />
      <ButtonRight
        style={{ position: 'absolute', top: `${sizes.droite[1]}px`, left: `${sizes.droite[0]}px` }}
        onClick={() => dispatch(padRight())}
      />
      <ButtonDown
        style={{ position: 'absolute', top: `${sizes.bas[1]}px`, left: `${sizes.bas[0]}px` }}
        onClick={() => dispatch(padDown())}
      />
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

export default compose(withConnect)(ButtonGroupArrows);
