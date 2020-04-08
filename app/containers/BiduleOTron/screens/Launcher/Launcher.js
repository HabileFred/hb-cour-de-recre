
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import Radar from './Radar/Radar';
import Params from './Params/Params';

import {
  makeSelectBiduleOTron,
  makeSelectRadar,
  makeSelectParams,
} from '../../selectors';

import imgLauncher from './img/launcher.png';

import { Cable1, Cable2, Pipe, Barometer, Propellant, Porthole, Transmission, Antenna } from './Animations';

function Launcher({ params, radar }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '550px',
      cursor: 'not-allowed',
    }}>
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
      <Porthole />
      <Transmission animated={params.velocity.SOLVED} />
    </div>
  );
}

Launcher.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  store: makeSelectBiduleOTron(),
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
