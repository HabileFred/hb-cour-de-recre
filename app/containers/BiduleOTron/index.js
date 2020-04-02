/**
 *
 * BiduleOTron
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBiduleOTron from './selectors';
import reducer from './reducer';
import messages from './messages';

import withSounds from './withSounds';
import sndOpenBidule from './sounds/ouverture_bidule.mp3';

import { padUp, padLeft, padRight, padDown, pipeRotate, padSubmit, padCancel, pipesCheck, buttonPressed } from './actions';

import MachinePieces from './parts/Pieces/Pieces';
import MachineBiduleSelector from './parts/Bidule/Bidule';
import MachinePipes from './parts/Pipes/Pipes';
import MachineLights from './parts/Lights/Lights';
import MachineBinary from './parts/Binary/Binary';
import MachineFuses from './parts/Fuses/Fuses';
import MachineSimon from './parts/Simon/Simon';
import ControlPanel from './parts/ControlPanel/ControlPanel';

import imgBackground from './img/machine_squelette.png';
import imgCacheBidule from './img/cache_bidule.png';
import imgPancarte from './img/pancarte.png';

const BiduleOTronContainer = styled.div`
  position: absolute;
  width: 1280px;
  height: 800px;
  border: 2px solid black;
  display: flex;
  flex-flow: column;
  align-self: center;
  background: white url('${imgBackground}') no-repeat;
  color: black;
  z-index: 0;

  .machine {
    position: relative;
    flex: 1;
  }

  .control-panel {
    background: rgba(255, 255, 0, 0.1);
    width: 100%;
    height: 200px;
  }
}
`;

const openCacheBiduleAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  5% {
    transform: translateY(10px);
  }
  85% {
    transform: translateY(-83%);
  }
  95% {
    transform: translateY(-77%);
  }
  to {
    transform: translateY(-80%);
  }
`;

const CacheBiduleContainer = styled.div`
  position: absolute;
  left: 954px;
  top: 236px;
  width: 190px;
  height: 215px;
  background: no-repeat top left url('${imgCacheBidule}');

  &.opened {
    animation: 1700ms ease-out ${openCacheBiduleAnimation};
    animation-fill-mode: forwards;
  }
`;

function CacheBidule({ opened, playSound }) {

  useEffect(() => {
    if (opened) {
      playSound('openBidule');
    }
  }, [opened]);
  
  return (
    <CacheBiduleContainer className={opened ? 'opened' : ''}>
    </CacheBiduleContainer>
  );
}

const rotateX = keyframes`
  from {
    transform: rotateX(20deg);
    transform-origin: bottom center;
  }
  50% {
    transform: rotateX(0deg);
    transform-origin: bottom center;
  }
  to {
    transform: rotateX(-20deg);
    transform-origin: bottom center;
  }
`;

const Pancarte = styled.div`
  position: absolute;
  left: 442px;
  top: 90px;
  height: 89px;
  width: 164px;
  animation: ${rotateX} 3s linear infinite;
`;

function MachineContainer({ dispatch, store, playSound, registerSound }) {

  useEffect(() => {
    registerSound('openBidule', sndOpenBidule);
  });

  return (
    <div className="machine">
      <Pancarte>
        <img style={{ position: 'absolute' }} src={imgPancarte} />
      </Pancarte>
      <MachineBiduleSelector focusId="bidule" pad={store.pad} bidule={store.bidule} />
      <MachinePieces focusId="pieces" pad={store.pad} pieces={store.pieces} />
      <MachinePipes focusId="pipes" pad={store.pad} fioles={store.fioles} />
      <MachineLights focusId="lights" pad={store.pad} lights={store.lights} />
      <MachineBinary focusId="binary" binary={store.binary} />
      <MachineFuses focusId="fuses" fuses={store.fuses} />
      <MachineSimon focusId="simon" simon={store.simon} />
      <CacheBidule opened={store.bidule.SOLVED} playSound={playSound} />
    </div>
  );
}

const Machine = withSounds(MachineContainer);

export function BiduleOTron({ dispatch, store }) {
  useInjectReducer({ key: 'bidulOTron', reducer });

  useEffect(() => {
    document.title = "Bidule-o-tron | Cour de récré | Habile Bill";
  });

  return (
    <BiduleOTronContainer>
      <Machine dispatch={dispatch} store={store}></Machine>
      <ControlPanel dispatch={dispatch} store={store}></ControlPanel>
    </BiduleOTronContainer>
  );
}

BiduleOTron.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  store: makeSelectBiduleOTron(),
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

export default compose(
  withConnect,
  withSounds
)(BiduleOTron);
