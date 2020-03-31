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

import './styles.scss';
import { padUp, padLeft, padRight, padDown, pipeRotate, padSubmit, padCancel, pipesCheck } from './actions';

import { MachinePieces } from './parts/Pieces/Pieces';
import { MachineBiduleSelector } from './parts/Bidule/Bidule';
import { MachineFioles } from './parts/Fioles/Fioles';


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
function ControlPanel({ dispatch, store }) {
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
        dispatch(padLeft());
        break;
      case 'RIGHT':
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


export function BidulOTron({ dispatch, store }) {
  useInjectReducer({ key: 'bidulOTron', reducer });

  useEffect(() => {
    document.title = "Bidul'o-tron | Cour de récré | Habile Bill";
  });

  return (
    <div className="bidul-o-tron">
      <h1 title="Un truc pour fabriquer des bidules.">Bidul'O-Tron</h1>
      <Machine dispatch={dispatch} store={store}></Machine>
      <ControlPanel dispatch={dispatch} store={store}></ControlPanel>
    </div>
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

export default compose(withConnect)(BidulOTron);
