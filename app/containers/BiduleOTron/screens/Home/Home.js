
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { makeSelectHome } from '../../selectors';

import imgBackground from './img/home.png';

import imgMachineOff from './img/biduleotron_off.png';
import imgMachineOn from './img/biduleotron_on.png';
import imgLauncherOff from './img/lancebidule_off.png';
import imgLauncherOn from './img/lancebidule_on.png';

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('${imgBackground}') top left no-repeat;
  display: flex;
  flex-flow: row;
  padding: 230px 466px;
`;

const MenuItem1 = styled.div`
  width: 245px;
  height: 311px;
  position: absolute;
  left: 80px;
  top: 90px;
  background: top left no-repeat url('${props => props.active ? imgMachineOn : imgMachineOff}');
`;

const MenuItem2 = styled.div`
  width: 245px;
  height: 311px;
  position: absolute;
  left: 365px;
  top: 90px;
  background: top left no-repeat url('${props => props.active ? imgLauncherOn : imgLauncherOff}');
`;

function Home({ home }) {
  return (
    <Wrapper>
      <MenuItem1 active={home.cursor === 0} />
      <MenuItem2 active={home.cursor === 1} />
    </Wrapper>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
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

export default compose(withConnect)(Home);
