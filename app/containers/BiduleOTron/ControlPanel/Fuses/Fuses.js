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
import imgFocus from './img/focus.png';

const Wrapper = styled.section`
  position: absolute;
  display: flex;
  flex-flow: column;
  bottom: 22px;
  left: 846px;
  height: 146px;

  &::before {
    pointer-events: none;
    content: "";
    position: absolute;
    width: 83px;
    height: 171px;
    left: -19px;
    top: -10px;
    opacity: ${props => props.focused ? 1 : 0};
    transition: opacity 250ms ease;
    background: top left no-repeat url('${imgFocus}');
  }
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
function ButtonGroupFuses({ dispatch, fuses, focused }) {
  return (
    <Wrapper focused={focused}>
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
