
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { makeSelectLogin } from '../../selectors';

import imgBackground from './img/accueil_fond.png';
import imgFocus from './img/focus.png';

function importDigitsImages() {
  const r = require.context('./img/', false, /\d\.png$/);
  const images = new Array(10);
  r.keys().forEach(key => {
    const l = parseInt(key.match(/\d\.png$/), 10);
    images[l] = r(key);
  });
  return images;
}
const digitImages = importDigitsImages();

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

const animation = keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
`;

const Focus = styled.div`
  position: absolute;
  width: 447px;
  height: 114px;
  top: 192px;
  left: 410px;
  background: url('${imgFocus}') top left no-repeat;
  animation: ${animation} 2s ease-in-out infinite;
  `;

const Digit = styled.div`
  width: 82px;
  height: 38px;
  background: center center no-repeat url('${props => digitImages[props.digit]}');
`;

function Login({ login }) {
  return (
    <Wrapper>
      <Focus />
      {login.password.map((d, i) => (
        d >= 0 && d <= 9 ? (<Digit key={`d${i}`} digit={d} />) : null
      ))}
    </Wrapper>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
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

export default compose(withConnect)(Login);