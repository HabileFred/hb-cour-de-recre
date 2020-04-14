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

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 73px;
  grid-gap: 24px;
  grid-auto-rows: 34px;
  position: absolute;
  bottom: 34px;
  left: 1177px;
`;

import { SubmitButton, CancelButton, MailboxButton, BillButton } from './Buttons';

/**
 *
 */
function ButtonGroupSubmitCancel({ dispatch }) {

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
      <BillButton style={{ position: 'absolute', left: '1079px', top: '91px' }} />
      <Wrapper>
        <CancelButton onClick={() => dispatch(padCancel())} />
        <SubmitButton onClick={() => dispatch(padSubmit())} />
      </Wrapper>
      <MailboxButton style={{ position: 'absolute', left: '1078px', top: '165px' }} onClick={() => dispatch(padMailbox())} />
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
