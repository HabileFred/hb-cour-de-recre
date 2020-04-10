
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import Radar from './Radar/Radar';
import Params from './Params/Params';

import {
  makeSelectBidule,
  makeSelectRadar,
  makeSelectParams,
} from '../../selectors';

import { Cable1, Cable2, Pipe, Barometer, Propellant, Porthole, Transmission, Antenna } from './Animations';

import imgBidulePresent from './img/bidule_aspitruc.png';
import imgBiduleAbsent from './img/bidule_aucun.png';
import imgLauncher from './img/launcher.png';
import imgBiduleOK from './img/bidule_ok.png';

const BiduleInfos = styled.div`
  position: absolute;
  left: 663px;
  top: 359px;
  width: 141px;
  height: 31px;
  z-index: 3;
  background: top left no-repeat url('${props => props.present ? imgBidulePresent : imgBiduleAbsent}');
`;

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
`;


function Launcher({ params, bidule, radar }) {
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
        background: `url('${imgLauncher}') top left no-repeat`,
      }}>
      </div>
      <Barometer />
      <Antenna />
      <Radar radar={radar} focusId="radar" />
      <Params params={params} focusId="params" />
      <Cable1 animated={radar.SOLVED} />
      <Cable2 animated={params.direction.SOLVED} />
      <Pipe animated={params.stability.SOLVED} />
      <Propellant />
      <BiduleInfos present={bidule.SOLVED} />
      <BiduleOK present={bidule.SOLVED} />
      <Porthole status={bidule.SOLVED ? 'bidule' : 'empty'} />
      <Transmission animated={params.velocity.SOLVED} />
    </Wrapper>
  );
}

Launcher.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bidule: makeSelectBidule(),
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
