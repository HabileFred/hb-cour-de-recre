import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  keypadInput,
} from '../../actions';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4,42px);
  grid-gap: 0px;
  grid-auto-rows: 20px;
  position: absolute;
  top: 54px;
  left: 638px;

`;

const keys = [
  '*', 4, 2, 7,
  6, 3, 9, 5,
  8, 2, 0, 6,
  1, 5, 7, 4,
];

import Button from './Button';

/**
 *
 */
function ButtonGroupKeypad({ dispatch, focused }) {

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
    <Wrapper focused={focused}>
      {keys.map((k, i) => (
        <Button key={`k${i}`} code={k === '*' ? '.' : k} onClick={() => dispatch(keypadInput(k))} />
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
