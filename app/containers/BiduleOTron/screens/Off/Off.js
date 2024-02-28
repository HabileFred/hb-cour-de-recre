
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { makeSelectLocale } from '../../../LanguageProvider/selectors'

import OffScreen from './img/ordi_ecran_eteint.svg';
import NoSignal from './img/ordi_ecran_eteint_texte_blanc.svg';
import NoSignalEN from './img/ordi_ecran_eteint_texte_blanc_en.svg';

const Wrapper = styled.section`
  top: 0;
  left: 0;
  width: 100%;
  height: 530px;
  display: flex;
  flex-flow: row;
  padding: 230px 466px;
  position: absolute;

  .no-signal {
    transform: scale(.8);
    transform-origin: center;
    position: absolute;
  }
`;

function Off({ lang }) {

  const getRandomX = () => 30 + Math.floor(Math.random() * 700);
  const getRandomY = () => 30 + Math.floor(Math.random() * 390);

  const [noSignal, setNoSignal] = useState({ x: getRandomX(), y: getRandomY() });

  useEffect(() => {
    let timer = window.setInterval(() => {
      setNoSignal({ x: getRandomX(), y: getRandomY() });
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  if (lang === 'fr') {
    return (
      <Wrapper>
        <OffScreen style={{ position: 'absolute', top: 0, left: 0 }}/>
        <NoSignal className="no-signal" style={{ top: `${noSignal.y}px`, left: `${noSignal.x}px` }}/>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <OffScreen style={{ position: 'absolute', top: 0, left: 0 }}/>
        <NoSignalEN className="no-signal" style={{ top: `${noSignal.y}px`, left: `${noSignal.x}px` }}/>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  lang: makeSelectLocale()
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

export default compose(withConnect)(Off);
