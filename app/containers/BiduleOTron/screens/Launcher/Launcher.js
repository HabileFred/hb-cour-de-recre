
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

// import MachineBidule from './Bidule/Bidule';

import {
  makeSelectBiduleOTron,
} from '../../selectors';

import imgLauncher from './img/launcher.png';


function Launcher({ store }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '550px',
      cursor: 'not-allowed',
      background: `url('${imgLauncher}') top left no-repeat`
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}>
      </div>
    </div>
  );
}

Launcher.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  store: makeSelectBiduleOTron(),
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
