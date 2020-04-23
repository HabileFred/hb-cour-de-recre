
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { SFX } from 'BOT/SoundManager';
import { focus } from 'BOT/reducers/focus';

import {
  makeSelectBidule,
  makeSelectRadar,
  makeSelectParams,
  makeSelectGame,
} from 'BOT/selectors';

import Radar from './Radar/Radar';
import Params from './Params/Params';

import Barometer from './Animations/Barometer/Barometer';
import Antenna from './Animations/Antenna/Antenna';
import Pipe from './Animations/Pipe/Pipe';
import ElectricWire from './Animations/ElectricWire/ElectricWire';
import Propellant from './Animations/Propellant/Propellant';
import Porthole from './Animations/Porthole/Porthole';
import Transmission from './Animations/Transmission/Transmission';
import Lever from './Animations/Lever/Lever';

import ImageBidulePresent from './img/bidule_nom.svg';
import ImageBiduleAbsent from './img/bidule_aucun.svg';
import ImagePancarte from './img/pancarte.svg';

import ImageLauncher from './img/lance_bidule.svg';
import imgBiduleOK from './img/bidule_ok.png';
import imgBackground from 'BOT/img/fond_machine.png';
import MailNotification from 'BOT/components/MailNotification/MailNotification';

import { popup, gameCompleted, removeControlPanelFocus, focusNext, replaceFocus, resetState } from '../../actions';

function BiduleName({ present, ...props }) {
  return present
    ? (<ImageBidulePresent className="bidule-name" {...props}/>)
    : (<ImageBiduleAbsent className="bidule-name" {...props}/>)
  ;
}

const BiduleOK = styled.div`
  position: absolute;
  left: 699px;
  top: 437px;
  width: 40px;
  height: 40px;
  z-index: 3;
  background: top left no-repeat url('${props => props.present ? imgBiduleOK : ''}');
  background-size: contain;
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

const Wrapper = styled.section`
  width: 100%;
  height: 530px;
  display: flex;
  flex-flow: row;
  cursor: not-allowed;
  background: no-repeat url('${imgBackground}');

  .bidule-name {
    position: absolute;
    left: 663px;
    top: 359px;
    width: 141px;
    height: 31px;
    z-index: 2;
  }

  .pancarte {
    position: absolute;
    left: 601px;
    top: 40px;
    height: 89px;
    width: 164px;
    z-index: 3;
    animation: ${rotateX} 3s linear infinite;
  }
`;

const wait = async (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

function Launcher({ dispatch, params, bidule, radar }) {

  const [portholeAnimation, setPortholeAnimation] = useState(null);
  const [propellantAnimation, setPropellantAnimation] = useState(null);
  const [leverStatus, setLeverStatus] = useState(false);

  const visualFX = async () => {
    await wait(300);
    setLeverStatus(true);
    await wait(500);

    SFX.play('fan');
    setPropellantAnimation('starting');
    await wait(2100);

    setPropellantAnimation('fast');
    setPortholeAnimation('shake');
    await wait(5000);

    dispatch(gameCompleted());
    SFX.play('rocket');
    setPortholeAnimation('launch');
    await wait(3000);

    setLeverStatus(false);
    await wait(1000);
    setPropellantAnimation('stopping');

    dispatch(popup(
      { id: 'score', closeButton: 'Submit' },
      () => focus.from('params').next()
    ));
    SFX.play('konami');
  };

  const popupOK = () => {
    dispatch(popup(
      { id: 'bidule-envoi-debut', closeButton: 'Submit' },
      () => setImmediate(visualFX),
    ));
  };

  useEffect(() => {
    let timer;
    if (params.SOLVED) {
      window.clearTimeout(timer);
      timer = window.setTimeout(popupOK, 1000);
    }
    return () => window.clearTimeout(timer);
  }, [params.SOLVED]);

  useEffect(() => {
    if (radar.SOLVED) {
      dispatch(replaceFocus('params'));
    }
  }, [radar.SOLVED]);

  useEffect(() => {
    if (!bidule.SOLVED) {
      dispatch(removeControlPanelFocus(['Arrows', 'Submit', 'Mailbox']));
    }
  }, [bidule.SOLVED]);

  useEffect(() => {
    dispatch(resetState('radar', { cursor: { x: 0, y: 0 } }));
  }, []);

  return (
    <Wrapper>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}>
        <ImageLauncher />
      </div>
      <ImagePancarte className="pancarte" />
      {bidule.SOLVED
        ? (<MailNotification animated={!radar.enabled}/>)
        : null
      }
      <Barometer />
      <Antenna animated={bidule.SOLVED} />
      <Radar radar={radar} focusId="radar" enabled={radar.enabled} />
      <Params params={params} focusId="params" />
      <ElectricWire w={1} animated={params.velocity.SOLVED} />
      <ElectricWire w={2} animated={params.direction.SOLVED} />
      <Pipe animated={params.stability.SOLVED} />
      <Propellant animation={propellantAnimation} />
      <BiduleName present={bidule.SOLVED} />
      <Lever active={params.SOLVED} on={leverStatus} />
      <Porthole bidule={bidule.SOLVED ? bidule.index + 1 : 0} animation={portholeAnimation}/>
      <Transmission animated={radar.SOLVED} />
    </Wrapper>
  );
}

Launcher.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bidule: makeSelectBidule(),
  game: makeSelectGame(),
  radar: makeSelectRadar(),
  params: makeSelectParams(),
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

export default compose(withConnect)(Launcher);
