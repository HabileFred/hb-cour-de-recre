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
  bottom: 37px;
  left: 1177px;
`;

import { SubmitButton, CancelButton, MailboxButton, BillButton } from './Buttons';
import { makeSelectGame } from '../../selectors';

/**
 *
 */
function ButtonGroupSubmitCancel({ dispatch, game }) {

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

  function goToHabileBillWebsite() {
    if (game.completedAt) {
      window.open('https://www.habilebill.fr');
    }
  }

  return (
    <React.Fragment>
      <BillButton style={{ position: 'absolute', left: '1079px', top: '91px' }} disabled={!game.completedAt} onClick={goToHabileBillWebsite} />
      <Wrapper>
        <CancelButton onClick={() => dispatch(padCancel())} />
        <SubmitButton onClick={() => dispatch(padSubmit())} />
      </Wrapper>
      <MailboxButton style={{ position: 'absolute', left: '1078px', top: '162px' }} onClick={() => dispatch(padMailbox())} />
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  game: makeSelectGame(),
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
