
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { gameStarted } from '../../actions';

import imgBackground from './img/off_fond.png';

const Wrapper = styled.section`
  top: 0;
  left: 0;
  width: 100%;
  height: 530px;
  background: url('${imgBackground}') top left no-repeat;
  display: flex;
  flex-flow: row;
  padding: 230px 466px;
`;

function Off({ dispatch }) {

  return (
    <Wrapper />
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

export default compose(withConnect)(Off);
