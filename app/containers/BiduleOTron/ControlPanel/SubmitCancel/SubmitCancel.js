import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  padSubmit,
  padCancel,
} from '../../actions';

import imgBill from './img/bill.png';
import imgFocus from './img/focus.png';

function importAllImages() {
  const r = require.context('./img/', false, /bouton_.*\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_(annuler|valider)_/)[1];
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
  grid-template-columns: 73px;
  grid-gap: 24px;
  grid-auto-rows: 34px;
  position: absolute;
  bottom: 34px;
  left: 1177px;
`;

const Button = styled.button`
  position: relative;
  border: none;
  outline: none;
  background: center center no-repeat url('${props => images[props.action][0]}');
  &:active {
    background-image: url('${props => images[props.action][1]}');
  }
  &:after {
    display: ${props => props.focused ? 'block' : 'none'};
    content: "";
    position: absolute;
    top: -10px;
    left: -13px;
    width: 94px;
    height: 56px;
    background: center center no-repeat url('${imgFocus}');
  }
`;

const Bill = styled.div`
  position: absolute;
  width: 71px;
  height: 53px;
  top: 91px;
  left: 1079px;
  background: center center no-repeat url('${imgBill}');
`;

/**
 *
 */
function ButtonGroupSubmitCancel({ dispatch, submitFocused, cancelFocused }) {

  const keyListener = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.keyCode === 13) {       // enter
      dispatch(padSubmit());
    } else if (event.keyCode === 8) { // backspace
      dispatch(padCancel());
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

  console.log(submitFocused, cancelFocused);
  return (
    <React.Fragment>
      <Bill />
      <Wrapper>
      <Button focused={cancelFocused} type="button" action="annuler" onClick={() => dispatch(padCancel())} />
        <Button focused={submitFocused} type="button" action="valider" onClick={() => dispatch(padSubmit())} />
      </Wrapper>
    </React.Fragment>
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

export default compose(withConnect)(ButtonGroupSubmitCancel);
