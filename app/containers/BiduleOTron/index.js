/**
 *
 * BiduleOTron
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectNav } from './selectors';
import reducer from './reducers/reducer';

import Machine from './screens/Machine/Machine';
import Login from './screens/Login/Login';
import Loading from './screens/Loading/Loading';
import ControlPanel from './ControlPanel/ControlPanel';
import Launcher from './screens/Launcher/Launcher';
import Home from './screens/Home/Home';

import imgBackground from './img/papier_peint.png';
import imgComputer from './img/ordinateur.png';
import imgMouseCursor from './img/cursor.png';
import imgPopupBg from './img/popup_fond.png';
import imgConfirm from './img/confirmation_annulation_bidule.png';
import imgShadow from './img/lueur.png';

const screenGlowAnimation = keyframes`
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
`;

const Shadow = styled.div`
  position: absolute;
  left: -15px;
  top: -28px;
  width: 1312px;
  height: 587px;
  z-index: -1;
  background: url('${imgShadow}') top left no-repeat;
  animation: ${screenGlowAnimation} 5s ease-in-out infinite;
`;

const Wrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 750px;
  background: url('${imgComputer}') no-repeat;
  z-index: 0;
  flex-shrink: 0;
`;

const Computer = styled.div`
  position: absolute;
  width: 1280px;
  height: 750px;
  background: url('${imgComputer}') no-repeat;
  color: black;
  z-index: 0;

  button {
    cursor: url('${imgMouseCursor}') 10 2, auto;
  }
`;

const popupAnimation = keyframes`
  from {
    transform: translateX(-50%) translateY(-50%) scale(.5);
    opacity: 0;
  }
  90% {
    transform: translateX(-50%) translateY(-50%) scale(1.15);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 530px;
  background: url('${imgPopupBg}') top left no-repeat;
  z-index: 100;
  cursor: not-allowed;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: ${popupAnimation} 330ms ease;
  }
`;

const BiduleOTronContainer = styled.div`
  background: url('${imgBackground}');
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: auto;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export function BiduleOTron({ nav }) {
  useInjectReducer({ key: 'biduleOTron', reducer });

  useEffect(() => {
    document.title = "Bidule-o-tron | Cour de récré | Habile Bill";
  });

  let screen;
  switch (nav.screen) {
    case 'loading':
      screen = (<Loading />);
      break;
    case 'machine':
      screen = (<Machine />);
      break;
    case 'launcher':
      screen = (<Launcher />);
      break;
    case 'home':
      screen = (<Home />);
      break;
    default:
      screen = (<Login />);
  }

  let popup;
  switch (nav.popup.id) {
    case 'confirm':
      popup = (<Popup><img src={imgConfirm} /></Popup>);
      break;
    default:
      popup = null;
  }

  return (
    <BiduleOTronContainer>
      <Wrapper>
        <Shadow />
        <Computer>
          {screen}
          {popup}
        <ControlPanel />
      </Computer>
      </Wrapper>
    </BiduleOTronContainer>
  );
}

BiduleOTron.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nav: makeSelectNav(),
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

export default compose(withConnect)(BiduleOTron);
