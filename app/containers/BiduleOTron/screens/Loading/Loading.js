
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import imgBackground from './img/chargement_fond.png';
import { focusNext } from '../../actions';

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: wait;
  background: url('${imgBackground}') top left no-repeat;
`;

function Loading({ dispatch }) {

  useEffect(() => {
    setTimeout(() => dispatch(focusNext()), 2000);
  });

  return (
    <Wrapper>
      Chargement en cours...
    </Wrapper>
  );
}

Loading.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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

export default compose(withConnect)(Loading);
