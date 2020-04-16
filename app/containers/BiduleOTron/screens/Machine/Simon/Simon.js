import React, { useEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Indicator from './img/simon.svg';
import Antenna from './img/antenne.svg';

import withFocus from 'BOT/withFocus';
import theme from 'BOT/Theme';

const MachineSimonContainer = styled.div`
  position: absolute;
  top: 257px;
  left: 749px;
  width: 119px;
  height: 253px;
  display: grid;
  grid-template-columns: 52px;
  grid-gap: 16.5px;
  grid-auto-rows: 12px;
  padding: 80px 0 0 30px;

  &.focused .indicator,
  &.solved .indicator {
    opacity: 1;
  }

  .indicator {
    opacity: 0;
    transition: opacity 250ms ease;
  }

  .indicator-1.on path[class$="fill-color"] {
    fill: ${theme.orangeLight};
  }
  .indicator-2.on path[class$="fill-color"] {
    fill: ${theme.electricBlueLight};
  }
  .indicator-3.on path[class$="fill-color"] {
    fill: ${theme.yellowLight};
  }
  .indicator-4.on path[class$="fill-color"] {
    fill: ${theme.pinkLight};
  }
  .indicator-5.on path[class$="fill-color"] {
    fill: ${theme.purpleLight};
  }

  .antenna {
    position: absolute;
    top: -48px;
    left: 25px;

    path.antenne_svg__step {
      opacity: 0;
      transition: opacity 250ms ease;
    }

    &.step-1 path.antenne_svg__step-1 {
      opacity: 1;
    }
    &.step-2 path.antenne_svg__step-2 {
      opacity: 1;
    }
    &.step-3 path.antenne_svg__step-3 {
      opacity: 1;
    }
    &.step-4 path.antenne_svg__step-4 {
      opacity: 1;
    }
    &.step-5 path.antenne_svg__step-5 {
      opacity: 1;
    }
    &.step-6 path.antenne_svg__step-6 {
      opacity: 1;
    }
    &.step-7 path.antenne_svg__step-7 {
      opacity: 1;
    }
    &.step-8 path.antenne_svg__step-8 {
      opacity: 1;
    }
  }
`;

/*
const Indicator = styled.div`
  width: 52px;
  height: 15px;
  margin-bottom: 14px;
  background: top left no-repeat url('${props => images[props.index][props.on ? 1 : 0]}');
`;
*/
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
      <Antenna className={`antenna step-${simon.length - 1}`} />
      {[1, 2, 3, 4, 5].map(i => (
        <Indicator key={i} className={classnames('indicator', `indicator-${i}`, { on: solved || (playingSeq && simon.desired[simon.cursor] === i) })} />
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
