
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { SFX } from 'BOT/SoundManager';
import { popup } from 'BOT/actions';
import { focus } from 'BOT/reducers/focus';

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
} from 'BOT/selectors';

import MachineBidule from './Bidule/Bidule';
import MachinePieces from './Pieces/Pieces';
import MachinePipes from './Pipes/Pipes';
import MachineLights from './Lights/Lights';
import MachineBinary from './Binary/Binary';
import MachineFuses from './Fuses/Fuses';
import MachineSimon from './Simon/Simon';
import MachineWires from './Wires/Wires';
import Indicators from './Indicators/Indicators';

import imgBackground from 'BOT/img/fond_machine.png';
import BiduleOTron from './img/bidule_o_tron.svg';

import ImageCacheBidule from './img/cache_bidule.svg';
import imgPancarte from './img/pancarte.png';
import { setControlPanelFocus, setScreen } from '../../actions';

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

const shakeCacheBiduleAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  10% {
    transform: translateX(1px);
  }
  20% {
    transform: translateX(-1px);
  }
  30% {
    transform: translateX(1px);
  }
  40% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  60% {
    transform: translateX(-2px);
  }
  70% {
    transform: translateX(1px);
  }
  80% {
    transform: translateX(-1px);
  }
  90% {
    transform: translateX(1px);
  }
  to {
    transform: translateX(0);
  }
`;

const cacheBiduleAnimations = {
  open: {
    name: openCacheBiduleAnimation,
    duration: '1700ms',
    iterations: 1,
  },
  shake: {
    name: shakeCacheBiduleAnimation,
    duration: '500ms',
    iterations: 'infinite',
  },
};

const CacheBidule = styled.div`
  position: absolute;
  left: 954px;
  top: 236px;
  width: 190px;
  height: 215px;
  animation-name: ${props => props.animation ? cacheBiduleAnimations[props.animation].name : 'none'};
  animation-timing-function: ease-out;
  animation-duration: ${props => props.animation ? cacheBiduleAnimations[props.animation].duration : 0};
  animation-iteration-count: ${props => props.animation ? cacheBiduleAnimations[props.animation].iterations : 0};
  animation-fill-mode: forwards;
`;

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

import theme from 'BOT/Theme';
import { makeSelectNav } from '../../selectors';

const focusKeys = ['binary', 'pieces', 'wires', 'fuses', 'lights', 'simon', 'pipes'];
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointerEvents: none;
  ${focusKeys.reduce((acc, key) => {
    const k = key.toLowerCase();
    acc += '&.focus-' + k + ' path[class$="focus-' + k + '"]{stroke-width:' + theme.focus.strokeWidth + ';stroke:' + theme.focus.color + ';fill:' + theme.focus.color + ';}\n';
    return acc;
  }, '')}
`;

function Machine({ dispatch, store, bidule, pieces, pipes, lights, binary, fuses, simon, wires, nav }) {

  const [cacheBiduleAnimation, setCacheBiduleAnimation] = useState(null);

  const goHome = () => dispatch(setScreen('home'));

  const biduleSolvedFX = () => {
    dispatch(setControlPanelFocus(null));

    SFX.play('machine');
    setCacheBiduleAnimation('shake');

    window.setTimeout(() => {
      SFX.play('visseuse');
    }, 4000);

    window.setTimeout(() => {
      SFX.play('biduleBuilt');
      setCacheBiduleAnimation('open');
    }, 10000);

    window.setTimeout(() => {
      dispatch(popup(
        { id: 'bidule-fabrication-fin', closeButton: 'Submit' },
        () => setImmediate(goHome),
      ));
    }, 14000);
  };

  useEffect(() => {
    if (bidule.SOLVED) {
      dispatch(popup(
        { id: 'bidule-fabrication-debut', closeButton: 'Submit' },
        () => setImmediate(biduleSolvedFX),
      ));
    }
  }, [bidule.SOLVED]);


  const focused = (id) => nav.focus.indexOf(id) !== -1;

  const classNames ={};
  focusKeys.forEach(key => classNames[`focus-${key.toLowerCase()}`] = focused(key));

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '530px',
      cursor: 'not-allowed',
      //background: `url('${imgBackground}') top left no-repeat`
    }}>
      <Wrapper className={classnames(classNames)}>
        <BiduleOTron />
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
        <CacheBidule animation={cacheBiduleAnimation}>
          <ImageCacheBidule/>
        </CacheBidule>
      </Wrapper>
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

export default compose(withConnect)(Machine);
