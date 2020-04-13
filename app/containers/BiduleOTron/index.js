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
import { makeSelectNav, makeSelectGame } from './selectors';
import reducer from './reducers/reducer';

import Machine from './screens/Machine/Machine';
import Login from './screens/Login/Login';
import Loading from './screens/Loading/Loading';
import ControlPanel from './ControlPanel/ControlPanel';
import Launcher from './screens/Launcher/Launcher';
import Home from './screens/Home/Home';
import Credits from './screens/Credits/Credits';
import Off from './screens/Off/Off';

import imgComputer from './img/ordinateur.png';
import imgMouseCursor from './img/cursor.png';

import imgShadow from './img/lueur.png';

import imgPopupBg from './img/popup_fond.png';
import imgConfirm from './img/popups/confirmation_annulation_bidule.png';
import imgMail from './img/popups/message.png';
import imgMailDirection from './img/popups/message_direction.png';
import imgScore from './img/popups/fin_score.png';
import imgConfirmOff from './img/popups/confirmation_eteindre.png';
import imgPopupBiduleBuild from './img/popups/fabrication_bidule.png';
import imgPopupBiduleSend from './img/popups/envoi_bidule.png';

import { Digits } from './Digits';

const Shadow = styled.div`
  position: absolute;
  left: -15px;
  top: -28px;
  width: 1312px;
  height: 587px;
  z-index: -1;
  background: url('${imgShadow}') top left no-repeat;
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
    //transform: translateX(-50%) translateY(-50%) scale(1.15);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
`;

const confirmAnimation = keyframes`
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

  .contents {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: ${popupAnimation} 330ms ease;
  }
`;

const Confirm = styled(Popup)`
  .contents {
    animation: ${confirmAnimation} 330ms ease;
  }
`;

const BiduleOTronContainer = styled.div`
  position: relative;
  display: flex;
  overflow: auto;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

import globalStyles from './styles.scss';

export function BiduleOTron({ nav, game }) {
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
    case 'credits':
      screen = (<Credits />);
      break;
    case 'off':
      screen = (<Off />);
      break;
    default:
      screen = (<Login />);
  }

  let popup;
  switch (nav.popup.id) {
    case 'confirm':
      popup = (
        <Confirm>
          <div className="contents">
            <img src={imgConfirm} />
          </div>
        </Confirm>
      );
      break;

    case 'confirm-off':
      popup = (
        <Confirm>
          <div className="contents">
          <img src={imgConfirmOff} />
          </div>
        </Confirm>
      );
      break;

    case 'mail':
      popup = (
        <Popup>
          <div className="contents">
            <img src={imgMail} />
          </div>
        </Popup>
      );
      break;

    case 'mail-direction':
      popup = (
        <Popup>
          <div className="contents">
            <img src={imgMailDirection} />
          </div>
        </Popup>
      );
      break;

    case 'bidule-fabrication-debut':
      popup = (
        <Popup>
          <div className="contents">
            <img src={imgPopupBiduleBuild} />
          </div>
        </Popup>
      );
      break;

    case 'bidule-envoi-debut':
      popup = (
        <Popup>
          <div className="contents">
            <img src={imgPopupBiduleSend} />
          </div>
        </Popup>
      );
      break;

    case 'score':
      const min = Math.ceil((game.completedAt - game.startedAt) / 60000);
      popup = (
        <Popup>
          <div className="contents">
            <img src={imgScore} />
            <Digits style={{ position: 'absolute', left: '210px', top: '155px', transform: 'scale(.8) translateX(-50%)' }} value={min} />
          </div>
        </Popup>
      );
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
  game: makeSelectGame(),
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
