
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { SFX } from 'BOT/SoundManager';
import MailNotification from 'BOT/components/MailNotification/MailNotification';

import { makeSelectLogin } from '../../selectors';
import { gameStarted } from '../../actions';

import { Digit } from 'BOT/components/Digits/Digits';
import LoginBackground from './img/mot_de_passe.svg';
import PasswordBorder from './img/encart_mdp.svg';

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

const digitsAnimation = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.1);
    opacity: 1;
  }
  to {
    transform: scale(1);
  }
`;

const Wrapper = styled.section`
  top: 0;
  left: 0;
  width: 100%;
  height: 530px;
  display: flex;
  flex-flow: row;
  padding: 234px 466px;

  .digits {
    margin-left: 20px;
    display: grid;
    grid-template-columns: repeat(4, 44px);
    grid-gap: 40px;
  }

  .password-border {
    position: absolute;
    top: 192px;
    left: 398px;
    animation: ${animation} 1500ms ease-in-out infinite;
  }

  .digit {
    transform-origin: bottom;
    animation: ${digitsAnimation} 150ms linear;
  }
`;

function Login({ dispatch, login }) {

  useEffect(() => {
    SFX.play('boot');
    dispatch(gameStarted());
  }, []);

  return (
    <Wrapper>
      <LoginBackground style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
      <MailNotification animated />
      <PasswordBorder className="password-border" />
      <div className="digits">
        {login.password.map((d, i) => (
          d >= 0 && d <= 9
            ? (<Digit className="digit" key={`d${i}`} size={40} color="rgb(131,98,247)" d={d}/>)
            : null
        ))}
      </div>
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
