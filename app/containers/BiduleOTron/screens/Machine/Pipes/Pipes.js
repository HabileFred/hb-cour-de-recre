import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import imgFiole1 from './img/fiole_1.gif';
import imgFiole2 from './img/fiole_2.gif';
import imgFiole3 from './img/fiole_3.gif';
import imgFiole4 from './img/fiole_4.gif';
import imgFiole5 from './img/fiole_5.gif';
import imgFiole6 from './img/fiole_6.gif';

import Pipe from './img/tuyaux_blanc.svg';
import PipeFixed from './img/tuyaux_noir.svg';

import GaugeEmpty from './img/tuyaux_jauge_vide.svg'
import Gauge2 from './img/tuyaux_jauge_2.svg'
import Gauge3 from './img/tuyaux_jauge_3.svg'
import Gauge4 from './img/tuyaux_jauge_4.svg'

function Gauge({ g, filled }) {
  switch (g) {
    case 1:
      return filled ? <Gauge2/> : <GaugeEmpty />;
    case 2:
      return filled ? <Gauge3/> : <GaugeEmpty />;
    case 3:
      return filled ? <Gauge4/> : <GaugeEmpty />;
    default:
      return <GaugeEmpty />;
  }
}

import ImageSymbols from './img/tuyaux_signes.svg';

const Fioles = styled.div`
  opacity: ${props => props.focused ? 1 : 0.5};
  transition: opacity 250ms ease;
`;

const Fiole = styled.div`
  position: absolute;
  background: transparent no-repeat center center;

  &.fiole-0 {
    top: 28px;
    left: 13px;
    width: 26px;
    height: 27px;
    background-image: url('${imgFiole1}');
  }
  &.fiole-1 {
    top: 15px;
    left: 39px;
    width: 11px;
    height: 40px;
    background-image: url('${imgFiole2}');
  }
  &.fiole-2 {
    top: 23px;
    left: 51px;
    width: 27px;
    height: 34px;
    background-image: url('${imgFiole3}');
  }
  &.fiole-3 {
    top: 33px;
    left: 73px;
    width: 22px;
    height: 22px;
    background-image: url('${imgFiole4}');
  }
  &.fiole-4 {
    top: 19px;
    left: 94px;
    width: 15px;
    height: 36px;
    background-image: url('${imgFiole5}');
  }
  &.fiole-5 {
    top: 0px;
    left: 108px;
    width: 25px;
    height: 56px;
    background-image: url('${imgFiole6}');
  }
`;

const MachinePipesContainer = styled.div`
  position: absolute;
  top: 275px;
  left: 583px;
  width: 145px;
  height: 210px;
`;

const Pipes = styled.div`
  display: grid;
  grid-template-columns: repeat(6,19.3px);
  grid-gap: 0;
  grid-auto-rows: 28px;
  position: absolute;
  top: 73px;
  left: 16px;

  .pipe {
    transition: transform 250ms ease-in-out;
  }
  .pipe.r1 {
    transform: rotate(0deg);
  }
  .pipe.r2 {
    transform: rotate(90deg);
  }
  .pipe.r3 {
    transform: rotate(180deg);
  }
  .pipe.r4 {
    transform: rotate(270deg);
  }
`;

const Gauges = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 19px);
  grid-gap: 0;
  grid-auto-rows: 30px;
  position: absolute;
  top: 185px;
  left: 20px;
  opacity: ${props => props.focused ? 1 : 0.5};
  transition: opacity 250ms ease;
`;

const MachinePipes = function({ focused, solved, pipes }) {
  return (
    <MachinePipesContainer className={classnames({ focused, solved })}>
      <Fioles focused={focused || solved}>
        <Fiole className="fiole-0" />
        <Fiole className="fiole-1" />
        <Fiole className="fiole-2" />
        <Fiole className="fiole-3" />
        <Fiole className="fiole-4" />
        <Fiole className="fiole-5" />
      </Fioles>
      <Pipes>
        {pipes.pipes.map((p, i) => p === 9
          ? <PipeFixed key={`p${i}`}/>
          : <Pipe key={`p${i}`} className={`pipe r${p}`} />
        )}
      </Pipes>
      <Gauges focused={focused}>
        {pipes.gauges.map((g, i) => <Gauge key={`g${i}`} g={i} filled={g && g.SOLVED} />)}
      </Gauges>
      <ImageSymbols style={{ position: 'absolute', bottom: '22px', left: '11px' }} />
    </MachinePipesContainer>
  );
}

export default withFocus(MachinePipes);