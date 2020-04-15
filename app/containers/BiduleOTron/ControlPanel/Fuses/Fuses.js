import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectFuses } from '../../selectors';

import {
  fuseToggle,
} from '../../actions';

const Wrapper = styled.section`
  position: absolute;
  display: flex;
  flex-flow: column;
  bottom: 27px;
  left: 846px;
  height: 146px;
`;

import Button from './Button';

/**
 *
 */
function ButtonGroupFuses({ dispatch, fuses, focused }) {
  return (
    <Wrapper focused={focused}>
      {fuses.values.map((v, i) => (
        <Button key={`b${i}`} value={v} onClick={() => dispatch(fuseToggle(i))} />
      ))}
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  fuses: makeSelectFuses(),
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

export default compose(withConnect)(ButtonGroupFuses);
