import React, { useEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import withFocus from 'BOT/withFocus';

function importImages() {
  const r = require.context('./img/', false, /couleur_.*\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/(\d)/)[1];
    const on = key.match(/_on_/);
    if (!images[l]) {
      images[l] = [];
    }
    images[l][on ? 1 : 0] = r(key);
  });
  return images;
}
const images = importImages();

import imgFocus from './img/simon_focus.png';

const MachineSimonContainer = styled.div`
  position: absolute;
  top: 256px;
  left: 749px;
  width: 119px;
  height: 253px;
  display: flex;
  flex-flow: column;
  opacity: 0;
  transition: opacity 250ms ease;
  padding: 80px 0 0 30px;

  &.focused,
  &.solved {
    opacity: 1;
  }

  &.focused::before {
    content: " ";
    position: absolute;
    left 0;
    top: 0;
    width: 119px;
    height: 253px;
    background: url(${imgFocus}) no-repeat top left;
  }
`;

const Indicator = styled.div`
  width: 52px;
  height: 15px;
  margin-bottom: 14px;
  background: top left no-repeat url('${props => images[props.index][props.on ? 1 : 0]}');
`;

const MachineSimon = function({ dispatch, simon, focused, solved }) {

  let timer;

  const sequencer = () => {
    dispatch({ type: 'SIMON_SEQ_PLAY_NEXT' });
  };

  const startSequencer = () => {
    timer = window.setInterval(sequencer, 1300);
  };

  const stopSequencer = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  useEffect(() => {
    dispatch({ type: 'SIMON_SEQ_GENERATE' });
  }, []);

  useEffect(() => {
    if (simon.status === 'Sequence') {
      startSequencer();
    } else {
      stopSequencer();
    }
    return stopSequencer;
  }, [simon.status]);

  const playingSeq = simon.status === 'Sequence';

  return (
    <MachineSimonContainer className={classnames({ focused, solved })}>
      {[1, 2, 3, 4, 5].map(i => (
        <Indicator key={i} index={i} on={solved || (playingSeq && simon.desired[simon.cursor] === i)} />
      ))}
    </MachineSimonContainer>
  );
};

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect, withFocus)(MachineSimon);
