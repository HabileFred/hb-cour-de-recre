import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectSimon } from '../../selectors';

import { buttonSimonPressed } from '../../actions';

function importAllImages() {
  const r = require.context('./img/', false, /bouton_simon_.*\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_([yuiop])_/)[1];
    const s = key.match(/_(on|off)\.png/)[1];
    if (!images[l]) {
      images[l] = [];
    }
    images[l][s === 'on' ? 1 : 0] = r(key);
  });
  return images;
}
const images = importAllImages();

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 99px;
  grid-gap: 0px;
  grid-auto-rows: 27px;
  position: absolute;
  bottom: 19px;
  left: 930px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background: center center no-repeat url('${props => images[props.letter][0]}');
  &:active {
    background-image: url('${props => images[props.letter][1]}');
  }
`;

const keys = {
  '89': 'y',
  '85': 'u',
  '73': 'i',
  '79': 'o',
  '80': 'p',
};

/**
 *
 */
function ButtonGroupSimon({ dispatch, simon }) {

  const keyListener = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    const l = keys[String(event.keyCode)];
    if (l) {
      dispatch(buttonSimonPressed(l));
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
      {['y', 'u', 'i', 'o', 'p'].map(l => (
        <Button key={l} type="button" letter={l} onClick={() => dispatch(buttonSimonPressed(l))} />
      ))}
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  simon: makeSelectSimon(),
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

export default compose(withConnect)(ButtonGroupSimon);
