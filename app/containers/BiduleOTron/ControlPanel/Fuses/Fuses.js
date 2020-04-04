import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectFuses } from '../../selectors';

import {
  fuseToggle,
} from '../../actions';

import imgButtonG from './img/bouton_fusible_gauche.png';
import imgButtonD from './img/bouton_fusible_droite.png';

const Wrapper = styled.section`
  position: absolute;
  display: flex;
  flex-flow: column;
  bottom: 22px;
  left: 846px;
  height: 146px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  width: 42px;
  height: 46px;
  margin-top: -9px;
  flex-shrink: 0;
  background: center center no-repeat url('${props => props.value === 'D' ? imgButtonD : imgButtonG}');
`;

/**
 *
 */
function ButtonGroupFuses({ dispatch, fuses }) {
  return (
    <Wrapper>
      {fuses.values.map((v, i) => (
        <Button key={`b${i}`} type="button" value={v} onClick={() => dispatch(fuseToggle(i))} />
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
