
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

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

import { Cable1, Cable2, Propellant, Porthole, Transmission } from './Animations.js';

import ImageBidulePresent from './img/bidule_nom.svg';
import ImageBiduleAbsent from './img/bidule_aucun.svg';

import ImageLauncher from './img/lance_bidule.svg';
import imgBiduleOK from './img/bidule_ok.png';
import imgBackground from 'BOT/img/fond_machine.png';
import { popup, gameCompleted } from '../../actions';

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
`;

function Launcher({ dispatch, game, params, bidule, radar }) {

  const [animation, setAnimation] = useState(null);

  const visualFX = () => {
    SFX.play('fan');
    window.setTimeout(() => {
      setAnimation('shake');
      window.setTimeout(() => {
        SFX.play('rocket');
        setAnimation('launch');
        window.setTimeout(() => {
          dispatch(popup('score', () => {
            focus.from('params').next();
          }));
        }, 4000);
      }, 4700);
    }, 1500);
  };

  useEffect(() => {
    if (params.SOLVED) {
      dispatch(gameCompleted());
      dispatch(popup(
        'bidule-envoi-debut',
        () => setImmediate(visualFX),
      ));
    }
  }, [params.SOLVED]);

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
      <Barometer />
      <Antenna />
      <Radar radar={radar} focusId="radar" enabled={bidule.SOLVED} />
      <Params params={params} focusId="params" />
      <ElectricWire w={1} animated={radar.SOLVED} />
      <ElectricWire w={2} animated={radar.SOLVED} />
      <Pipe animated={params.stability.SOLVED} />
      <Propellant animated={params.SOLVED} />
      <BiduleName present={bidule.SOLVED} />
      <BiduleOK present={bidule.SOLVED} />
      <Porthole status={bidule.SOLVED ? 'bidule' : 'empty'} animation={animation}/>
      <Transmission animated={params.velocity.SOLVED} />
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
