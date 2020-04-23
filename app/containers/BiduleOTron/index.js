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
import styled from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectNav, makeSelectGame, makeSelectStatus } from './selectors';
import reducer from './reducers/reducer';

import Machine from './screens/Machine/Machine';
import Login from './screens/Login/Login';
import Loading from './screens/Loading/Loading';
import ControlPanel from './ControlPanel/ControlPanel';
import Launcher from './screens/Launcher/Launcher';
import Home from './screens/Home/Home';
import Credits from './screens/Credits/Credits';
import Off from './screens/Off/Off';

import { Digits } from 'BOT/components/Digits/Digits';
import { Confirm, Popup } from 'BOT/components/Popups/Popups';

import ConfirmChangeBidule from './img/popups/confirm_annule_bidule.svg';
import ConfirmSwitchOff from './img/popups/confirm_extinction_machine.svg';
import PopupBiduleBuild from './img/popups/fabrication_bidule.svg';
import PopupBiduleReady from './img/popups/bidule_dans_bidulotheque.svg';
import PopupBiduleSend from './img/popups/envoie_bidule.svg';
import PopupMail from './img/popups/lettre_debut.svg';
import PopupMailDestination from './img/popups/lettre_destination.svg';
import PopupScore from './img/popups/scoring.svg';
import PopupKonami from './img/popups/habile_bill.svg';
import PopupBiduleError from './img/popups/erreur_bidule.svg';

import imgMouseCursor from './img/cursor.png';
import imgShadow from './img/lueur.png';

import ComputerScreen from './img/ordi_ecran.svg';

import './styles.scss';

const Shadow = styled.div`
  position: absolute;
  left: -15px;
  top: -28px;
  width: 1312px;
  height: 587px;
  z-index: -1;
  display: ${props => props.on ? 'block' : 'none'};
  background: url('${imgShadow}') top left no-repeat;
`;

const Wrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 750px;
  z-index: 0;
  flex-shrink: 0;
`;

const Computer = styled.div`
  position: absolute;
  width: 1280px;
  height: 750px;
  color: black;
  z-index: 0;
  overflow: hidden;

  button {
    cursor: url('${imgMouseCursor}') 10 2, auto;
  }
  button:disabled {
    cursor: not-allowed;
  }
`;

const BiduleOTronContainer = styled.div`
  position: relative;
  display: flex;
  overflow: auto;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  flex-shrink: 0;
`;

export function BiduleOTron({ nav, game, status }) {
  useInjectReducer({ key: 'biduleOTron', reducer });

  useEffect(() => {
    document.title = "Bill-o-tron | Cour de récré | Habile Bill";
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
      popup = (<Confirm><ConfirmChangeBidule /></Confirm>);
      break;

    case 'confirm-off':
      popup = (<Confirm><ConfirmSwitchOff /></Confirm>);
      break;

    case 'mail':
      popup = (<Popup><PopupMail /></Popup>);
      break;

    case 'mail-direction':
      popup = (<Popup><PopupMailDestination /></Popup>);
      break;

    case 'bidule-fabrication-debut':
      popup = (<Popup><PopupBiduleBuild /></Popup>);
      break;
    case 'bidule-fabrication-fin':
      popup = (<Popup><PopupBiduleReady /></Popup>);
      break;

    case 'bidule-envoi-debut':
      popup = (<Popup><PopupBiduleSend /></Popup>);
      break;

    case 'erreur-bidule':
      popup = (<Popup><PopupBiduleError /></Popup>);
      break;

    case 'konami':
      popup = (<Popup><PopupKonami /></Popup>);
      break;

    case 'score':
      const minutes = Math.ceil((game.completedAt - game.startedAt) / 60000);
      popup = (
        <Popup>
          <PopupScore />
          <Digits size={20} color="#4B4B4B" style={{ position: 'absolute', left: '277px', top: '220px', transform: 'translateX(-50%)' }} value={minutes} />
        </Popup>
      );
      break;

    default:
      popup = null;
  }

  return (
    <BiduleOTronContainer>
      <Wrapper>
        <Shadow on={status === 'on'}/>
        <Computer>
          <ComputerScreen style={{ position: 'absolute', zIndex: -1 }} />
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
  status: makeSelectStatus(),
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
