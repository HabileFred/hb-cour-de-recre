import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  padSubmit,
  padCancel,
  padMailbox,
} from '../../actions';

import imgBill from './img/bill.png';
import imgFocus from './img/focus.png';

function importAllImages() {
  const r = require.context('./img/', false, /bouton_.*\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_(annuler|valider|message)_/)[1];
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
    opacity: ${props => props.focused ? 1 : 0};
    transition: opacity 250ms ease;
    content: "";
    position: absolute;
    top: -10px;
    left: -13px;
    width: 94px;
    height: 56px;
    background: center center no-repeat url('${imgFocus}');
  }
`;

const MailButton = styled(Button)`
  position: absolute;
  width: 73px;
  height: 34px;
  top: 165px;
  left: 1079px;
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
function ButtonGroupSubmitCancel({ dispatch, submitFocused, cancelFocused, mailboxFocused }) {

  const keyListener = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.keyCode === 13) {        // enter
      dispatch(padSubmit());
    } else if (event.keyCode === 8) {  // backspace
      dispatch(padCancel());
    } else if (event.keyCode === 192) { // mail
      dispatch(padMailbox());
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
    <React.Fragment>
      <Bill />
      <Wrapper>
        <Button focused={cancelFocused} type="button" action="annuler" onClick={() => dispatch(padCancel())} />
        <Button focused={submitFocused} type="button" action="valider" onClick={() => dispatch(padSubmit())} />
      </Wrapper>
      <MailButton focused={mailboxFocused} type="button" action="message" onClick={() => dispatch(padMailbox())} />
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
