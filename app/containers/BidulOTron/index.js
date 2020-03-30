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

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBidulOTron from './selectors';
import reducer from './reducer';
import messages from './messages';

import './styles.scss';
import { padUp, padLeft, padRight, padDown, pipeRotate } from './actions';


function Machine({ dispatch, store }) {
  return (
    <div className="machine">
      {store.pieces.current.map((v, i) => (
        <div key={`p${i}`} className={`piece piece-${i} piece-value-${v} ${store.pieces.cursor === i ? 'active' : ''}`} />
      ))}
    </div>
  );
}


function ControlPanel({ dispatch, store }) {

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
    }
  }

  function rotatePipe(index) {
    dispatch(pipeRotate(index));
  }

  if (!store.pipes) {
    return 'Chargement en cours...';
  }
  return (
    <div className="control-panel">
      <div className="pad">
        <button type="button" onClick={() => padClicked('UP')}>UP</button>
        <button type="button" onClick={() => padClicked('DOWN')}>DOWN</button>
        <button type="button" onClick={() => padClicked('LEFT')}>LEFT</button>
        <button type="button" onClick={() => padClicked('RIGHT')}>RIGHT</button>
      </div>
      <div className="pipe-buttons">
        {[store.pipes.current.map((v, i) => (
          <button key={`pipe-button-${i}`} type="button" onClick={() => rotatePipe(i)}>{i}</button>
        ))]}
      </div>
    </div>
  );
}


export function BidulOTron({ dispatch, store }) {
  useInjectReducer({ key: 'bidulOTron', reducer });

  useEffect(() => {
    document.title = "Bidul'o-tron";

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

  return (
    <div className="bidul-o-tron">
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
