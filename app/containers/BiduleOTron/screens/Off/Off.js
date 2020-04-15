
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import OffScreen from './img/ecran_eteint.svg';

const Wrapper = styled.section`
  top: 0;
  left: 0;
  width: 100%;
  height: 530px;
  display: flex;
  flex-flow: row;
  padding: 230px 466px;
`;

function Off({ dispatch }) {
  return (
    <Wrapper>
      <OffScreen style={{ position: 'absolute', top: 0, left: 0 }}/>
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

export default compose(withConnect)(Off);
