import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  keypadInput,
} from '../../actions';

function importKeyImages() {
  const r = require.context('./img/', false, /numero_.+\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_([^.]+)\.png/)[1];
    images[l] = r(key);
  });
  return images;
}
const keyImages = importKeyImages();

import btnImageOn from './img/bouton_numero_on.png';
import btnImageOff from './img/bouton_numero_off.png';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4,42px);
  grid-gap: 0px;
  grid-auto-rows: 20px;
  position: absolute;
  top: 54px;
  left: 638px;
`;

const Key = styled.button`
  position: relative;
  border: none;
  outline: none;
  background: center center no-repeat url('${btnImageOff}');

  &:active {
    background-image: url('${btnImageOn}');
  }

  &::after {
    position: absolute;
    top: 1px;
    left: 14px;
    content: "";
    width: 15px;
    height: 13px;
    background: center center no-repeat url('${props => keyImages[props.code]}');
  }

  &:active::after {
    top: 3px;
  }
`;

const keys = [
  '*', 4, 2, 7,
  6, 3, 9, 5,
  8, 2, 0, 6,
  1, 5, 7, 4,
];

/**
 *
 */
function ButtonGroupKeypad({ dispatch }) {

  const keyListener = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    const k = event.keyCode;
    let n = -1;
    if (k >= 48 && k <= 57) {
      n = k - 48;
    } else if (k >= 96 && k <= 105) {
      n = k - 96;
    } else if (k === 106 || k === 221) {
      dispatch(keypadInput('*'));
    }
    if (n !== -1) {
      dispatch(keypadInput(n));
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
      {keys.map((k, i) => (
        <Key key={`k${i}`} code={k === '*' ? 'depart' : k} type="button" onClick={() => dispatch(keypadInput(k))} />
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

export default compose(withConnect)(ButtonGroupKeypad);
