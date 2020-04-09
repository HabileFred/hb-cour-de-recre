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

const Computer = styled.div`
  position: absolute;
  width: 1280px;
  height: 750px;
  display: flex;
  flex-flow: column;
  align-self: center;
  background: url('${imgComputer}') no-repeat;
  color: black;
  z-index: 0;

  button {
    cursor: url('${imgMouseCursor}') 10 2, auto;
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 570px;
  //background: url('${imgBackground}') top left no-repeat;
  background: rgba(0,0,0,0.5);
  z-index: 100;
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
  align-self: center;
}
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
      popup = (<Popup>Confim?</Popup>);
      break;
    default:
      popup = null;
  }

  return (
    <BiduleOTronContainer>
      <Computer>
        {screen}
        {popup}
        <ControlPanel />
      </Computer>
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
