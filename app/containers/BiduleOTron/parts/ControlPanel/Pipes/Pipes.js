import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectPipes } from '../../../selectors';

import {
  pipeRotate,
  pipesCheck,
} from '../../../actions';

import imgButton from './img/bouton_tuyaux_off.png';
import imgButtonPressed from './img/bouton_tuyaux_on.png';

const buttonPipesLetters = 'AZ ERTQSD F WXCVBN'.split('');

const ButtonGroupWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(6,30px);
  grid-gap: 5px;
  grid-auto-rows: 32px;
  position: absolute;
  bottom: 28px;
  left: 211px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background: center center no-repeat url('${imgButton}');
  &:active {
    background-image: url('${imgButtonPressed}');
  }
`;

/**
 *
 */
function ButtonGroupPipes({ dispatch, pipes }) {
  let pipeCheckTimeout = null;

  function rotatePipe(index) {
    dispatch(pipeRotate(index));
    if (pipeCheckTimeout) {
      window.clearTimeout(pipeCheckTimeout);
    }
    pipeCheckTimeout = window.setTimeout(
      () => {
        dispatch(pipesCheck());
        pipeCheckTimeout = null;
      },
      500,
    );
  }

  const keyListener = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const p = buttonPipesLetters.indexOf(String.fromCharCode(event.keyCode));
      if (p !== -1) {
        rotatePipe(p);
      }
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
      {[pipes.pipes.map((v, i) =>
        v === 9
        ? (<div key={`pipe-button-${i}`}></div>)
        : (
          <Button key={`pipe-button-${i}`} type="button" onClick={() => rotatePipe(i)} />
        )
      )]}
    </ButtonGroupWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  pipes: makeSelectPipes(),
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

export default compose(withConnect)(ButtonGroupPipes);
