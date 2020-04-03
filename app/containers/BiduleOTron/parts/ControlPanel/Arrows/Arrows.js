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
} from '../../../actions';

function importAllImages() {
  const r = require.context('./img/', false, /\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_(bas|haut|gauche|droite)_/)[1];
    const s = key.match(/_(on|off)\.png/)[1];
    if (!images[l]) {
      images[l] = [];
    }
    images[l][s === 'on' ? 1 : 0] = r(key);
  });
  return images;
}

const images = importAllImages();

const width = 138;
const height = 110;

const sizes = {
  haut: [40, 10, 47, 34],
  bas: [41, 70, 44, 35],
  gauche: [5, 33, 35, 46],
  droite: [85, 33, 37, 46],
};

const ButtonGroupWrapper = styled.section`
  position: absolute;
  bottom: 15px;
  left: 47px;
  width: ${width}px;
  height: ${height}px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  position: absolute;
  top: ${props => sizes[props.dir][1]}px;
  left: ${props => sizes[props.dir][0]}px;
  width: ${props => sizes[props.dir][2]}px;
  height: ${props => sizes[props.dir][3]}px;
  background: center center no-repeat url('${props => images[props.dir][0]}');
  &:active {
    background-image: url('${props => images[props.dir][1]}');
  }
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
    <ButtonGroupWrapper>
      <Button type="button" dir="haut" onClick={() => dispatch(padUp())} />
      <Button type="button" dir="gauche" onClick={() => dispatch(padLeft())} />
      <Button type="button" dir="droite" onClick={() => dispatch(padRight())} />
      <Button type="button" dir="bas" onClick={() => dispatch(padDown())} />
    </ButtonGroupWrapper>
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
