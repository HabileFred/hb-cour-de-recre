import React, { useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectSimon } from '../../selectors';

import { buttonSimonPressed } from '../../actions';

import Button from './Button';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 99px;
  grid-gap: 0px;
  grid-auto-rows: 27px;
  position: absolute;
  bottom: 22px;
  left: 930px;
`;

const keys = {
  '89': 'y',
  '85': 'u',
  '73': 'i',
  '79': 'o',
  '80': 'p',
};

const colors = {
  'y': 'orange',
  'u': 'blue',
  'i': 'yellow',
  'o': 'pink',
  'p': 'purple',
};

/**
 *
 */
function ButtonGroupSimon({ dispatch, focused }) {

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
    <Wrapper focused={focused}>
      {['y', 'u', 'i', 'o', 'p'].map(l => (
        <Button key={l} color={colors[l]} onClick={() => dispatch(buttonSimonPressed(l))} />
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
