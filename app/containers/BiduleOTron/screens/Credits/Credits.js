
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import imgBackground from './img/credits_fond.png';
import imgDesign from './img/credits_design.png';
import imgCode from './img/credits_programmation.png';
import imgMusic from './img/credits_musique.png';

const shakeAnimation = keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(.9);
  }
  to {
    transform: scale(1);
  }
`;

const CreditsIcon = styled.div`
  position: absolute;
  width: 132px;
  height: 119px;
  top: 110px;
  animation: ${shakeAnimation} 2s ease-in infinite;
`;

const CreditsIconDesign = styled(CreditsIcon)`
  left: 223px;
  background: url('${imgDesign}');
`;
const CreditsIconCode = styled(CreditsIcon)`
  left: 570px;
  top: 115px;
  background: url('${imgCode}');
  animation-delay: 750ms;
`;
const CreditsIconMusic = styled(CreditsIcon)`
  left: 900px;
  top: 120px;
  background: url('${imgMusic}');
  animation-delay: 1500ms;
`;

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: not-allowed;
  background: url('${imgBackground}') top left no-repeat;
`;

function Credits({ dispatch }) {

  return (
    <Wrapper>
      <CreditsIconDesign />
      <CreditsIconCode />
      <CreditsIconMusic />
    </Wrapper>
  );
}

Credits.propTypes = {
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

export default compose(withConnect)(Credits);
