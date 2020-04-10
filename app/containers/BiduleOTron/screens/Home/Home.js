
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import { makeSelectHome } from '../../selectors';

import imgBackground from './img/home.png';
import imgMachineOff from './img/biduleotron_off.png';
import imgMachineOn from './img/biduleotron_on.png';
import imgLauncherOff from './img/lancebidule_off.png';
import imgLauncherOn from './img/lancebidule_on.png';

const Wrapper = styled.section`
  width: 100%;
  flex: 1;
  background: url('${imgBackground}') top left no-repeat;
  display: flex;
  flex-flow: row;
  padding: 230px 466px;
`;

const animation = keyframes`
  from {
    transform: scale(.95);
  }
  50% {
    transform: scale(1.10);
  }
  to {
    transform: scale(.95);
  }
`;

const MenuItem1 = styled.div`
  width: 245px;
  height: 311px;
  position: absolute;
  left: 80px;
  top: 90px;
  background-image: url('${imgMachineOff}');
  transform: scale(.95);

  &.active {
    animation: ${animation} 1300ms ease-in-out infinite;
    background-image: url('${imgMachineOn}');
  }
`;

const MenuItem2 = styled.div`
  width: 245px;
  height: 311px;
  position: absolute;
  left: 365px;
  top: 90px;
  background-image: url('${imgLauncherOff}');
  transform: scale(.95);

  &.active {
    animation: ${animation} 1300ms ease-in-out infinite;
    background-image: url('${imgLauncherOn}');
  }
`;

function Home({ home }) {
  return (
    <Wrapper>
      <MenuItem1 className={classnames({ active: home.cursor === 0 })} />
      <MenuItem2 className={classnames({ active: home.cursor === 1 })} />
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
