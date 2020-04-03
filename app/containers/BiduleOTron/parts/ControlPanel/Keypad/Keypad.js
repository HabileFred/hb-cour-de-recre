import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  keypadInput,
} from '../../../actions';

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
  grid-template-columns: repeat(4, 44px);
  grid-gap: 0px;
  grid-auto-rows: 22px;
  position: absolute;
  top: 50px;
  left: 634px;
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
  'depart', 4, 2, 7,
  6, 3, 9, 5,
  8, 2, 0, 6,
  1, 5, 7, 4,
];

/**
 *
 */
function ButtonGroupKeypad({ dispatch, binary }) {
  return (
    <Wrapper>
      {keys.map((k, i) => (
        <Key key={`k${i}`} code={k} type="button" onClick={() => dispatch(keypadInput(k))} />
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
