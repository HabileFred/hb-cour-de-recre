
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';

import { makeSelectHome } from '../../selectors';

import imgBackground from './img/accueil_fond.png';

function importDigitsImages() {
  const r = require.context('./img/', false, /\d\.png$/);
  const images = new Array(10);
  r.keys().forEach(key => {
    const l = parseInt(key.match(/\d\.png$/), 10);
    images[l] = r(key);
  });
  return images;
}
const digitImages = importDigitsImages();

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

const Digit = styled.div`
  width: 82px;
  height: 38px;
  background: center center no-repeat url('${props => digitImages[props.digit]}');
`;

function Home({ home }) {
  return (
    <Wrapper>
      {home.password.map((d, i) => (
        d >= 0 && d <= 9 ? (<Digit key={`d${i}`} digit={d} />) : null
      ))}
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
