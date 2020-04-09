
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import MachineBidule from './Bidule/Bidule';
import MachinePieces from './Pieces/Pieces';
import MachinePipes from './Pipes/Pipes';
import MachineLights from './Lights/Lights';
import MachineBinary from './Binary/Binary';
import MachineFuses from './Fuses/Fuses';
import MachineSimon from './Simon/Simon';
import MachineWires from './Wires/Wires';
import Indicators from './Indicators/Indicators';

import {
  makeSelectBidule,
  makeSelectPieces,
  makeSelectPipes,
  makeSelectLights,
  makeSelectBinary,
  makeSelectFuses,
  makeSelectSimon,
  makeSelectWires,
  makeSelectBiduleOTron,
} from '../../selectors';

import imgCacheBidule from './img/cache_bidule.png';
import imgPancarte from './img/pancarte.png';
import imgMachine from './img/machine_squelette.png';

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

function CacheBidule({ opened }) {
return (
  <CacheBiduleContainer className={opened ? 'opened' : ''} />
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

function Machine({ store, bidule, pieces, pipes, lights, binary, fuses, simon, wires }) {
  return (
    <div style={{
      width: '100%',
      height: '520px',
      cursor: 'not-allowed',
      // TODO Use Theme filter: 'drop-shadow(3px 0px 2px rgba(0,0,0,0.3))',
      background: `url('${imgMachine}') top left no-repeat`
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}>
        <Pancarte>
          <img style={{ position: 'absolute' }} src={imgPancarte} />
        </Pancarte>
        <MachineBidule focusId="bidule" bidule={bidule} />
        <MachinePieces focusId="pieces" pieces={pieces} />
        <MachinePipes focusId="pipes" pipes={pipes} />
        <MachineLights focusId="lights" lights={lights} />
        <MachineBinary focusId="binary" binary={binary} />
        <MachineFuses focusId="fuses" fuses={fuses} />
        <MachineSimon focusId="simon" simon={simon} />
        <MachineWires focusId="wires" wires={wires} />
        <Indicators store={store} />
        <CacheBidule opened={bidule.SOLVED} />

      </div>
    </div>
  );
}

Machine.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  store: makeSelectBiduleOTron(),
  bidule: makeSelectBidule(),
  pieces: makeSelectPieces(),
  pipes: makeSelectPipes(),
  lights: makeSelectLights(),
  binary: makeSelectBinary(),
  fuses: makeSelectFuses(),
  simon: makeSelectSimon(),
  wires: makeSelectWires(),
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

export default compose(withConnect)(Machine);
