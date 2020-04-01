/**
 *
 * BidulOTron
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBidulOTron from './selectors';
import reducer from './reducer';
import messages from './messages';

import withSounds from '../../components/withSounds';
import sndBip from './sounds/10691.mp3';

import { padUp, padLeft, padRight, padDown, pipeRotate, padSubmit, padCancel, pipesCheck } from './actions';

import { MachinePieces } from './parts/Pieces/Pieces';
import { MachineBiduleSelector } from './parts/Bidule/Bidule';
import { MachineFioles } from './parts/Fioles/Fioles';

import imgBackground from './img/machine_squelette.png';

const BidulOTronContainer = styled.div`
  position: absolute;
  width: 1280px;
  height: 800px;
  border: 2px solid black;
  display: flex;
  flex-flow: column;
  align-self: center;
  background:  white url('${imgBackground}') no-repeat;
  color: black;
  z-index: 0;

  h1 {
    position: absolute;
    text-transform: uppercase;
    padding: 0.3em;
    margin: 0;
    border-bottom: 5px solid rgb(42,228,123);
    top: 28px;
    left: 40px;
    font-size: 18pt;
    transform: skew(2deg, 3deg);
  }

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

function Machine({ dispatch, store }) {
  return (
    <div className="machine">
      <MachineBiduleSelector pad={store.pad} bidule={store.bidule} />
      <MachinePieces pad={store.pad} pieces={store.pieces} />
      <MachineFioles pad={store.pad} fioles={store.fioles} />
    </div>
  );
}

/**
 *
 */
function ControlPanel({ dispatch, store, playSound }) {
  useEffect(() => {
    document.title = "Bidul'o-tron | Cour de récré | Habile Bill";

    document.onkeyup = function (e) {
      switch (e.keyCode) {
        case 37:
          e.stopPropagation();
          dispatch(padLeft());
          break;
        case 38:
          e.stopPropagation();
          dispatch(padUp());
          break;
        case 39:
          e.stopPropagation();
          dispatch(padRight());
          break;
        case 40:
          e.stopPropagation();
          dispatch(padDown());
          break;
      }
      return false;
    };
  });

  /**
   * @param {String} key
   */
  function padClicked(key) {
    switch (key) {
      case 'UP':
        dispatch(padUp());
        break;
      case 'DOWN':
        dispatch(padDown());
        break;
      case 'LEFT':
          playSound('bip');
          dispatch(padLeft());
        break;
      case 'RIGHT':
          playSound('bip');
          dispatch(padRight());
        break;
      case 'SUBMIT':
        dispatch(padSubmit());
        break;
      case 'CANCEL':
        dispatch(padCancel());
        break;
    }
  }

  let pipeCheckTimeout = null;

  function rotatePipe(index) {
    dispatch(pipeRotate(index));
    if (pipeCheckTimeout) {
      window.clearTimeout(pipeCheckTimeout);
    }
    pipeCheckTimeout = window.setTimeout(
      () => {
        dispatch(pipesCheck());
        pipeCheckTimeout = null;
      },
      500,
    );
  }

  if (!store.fioles) {
    return null;
  }
  return (
    <div className="control-panel">
      <div className="pad">
        <button type="button" onClick={() => padClicked('UP')}>UP</button>
        <button type="button" onClick={() => padClicked('DOWN')}>DOWN</button>
        <button type="button" onClick={() => padClicked('LEFT')}>LEFT</button>
        <button type="button" onClick={() => padClicked('RIGHT')}>RIGHT</button>
        {' '}
        <button type="button" onClick={() => padClicked('SUBMIT')}>ENTER</button>
        <button type="button" onClick={() => padClicked('CANCEL')}>CANCEL</button>
      </div>
      <div className="pipe-buttons" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 40px)'}}>
        {[store.fioles.pipes.map((v, i) => (
          <button key={`pipe-button-${i}`} type="button" onClick={() => rotatePipe(i)}>{i}</button>
        ))]}
      </div>
    </div>
  );
}

export function BidulOTron({ dispatch, store, registerSound, playSound }) {
  useInjectReducer({ key: 'bidulOTron', reducer });

  useEffect(() => {
    document.title = "Bidul'o-tron | Cour de récré | Habile Bill";
    console.log(sndBip);
    registerSound('bip', sndBip);
  });

  return (
    <BidulOTronContainer>
      <audio src="./sounds/10691.mp3" id="soundBip"></audio>
      <h1 title="Un truc pour fabriquer des bidules.">Bidul'O-Tron</h1>
      <Machine dispatch={dispatch} store={store}></Machine>
      <ControlPanel dispatch={dispatch} store={store} playSound={playSound}></ControlPanel>
    </BidulOTronContainer>
  );
}

BidulOTron.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  store: makeSelectBidulOTron(),
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
)(BidulOTron);
