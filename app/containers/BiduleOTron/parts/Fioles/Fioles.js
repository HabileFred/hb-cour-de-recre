import React from 'react';
import styled from 'styled-components';

import withFocus from '../../withFocus';

import imgFiole1 from './img/fiole_1.gif';
import imgFiole2 from './img/fiole_2.gif';
import imgFiole3 from './img/fiole_3.gif';
import imgFiole4 from './img/fiole_4.gif';
import imgFiole5 from './img/fiole_5.gif';
import imgFiole6 from './img/fiole_6.gif';

import imgMachineFiolesFocus from './img/focus_tuyaux.png';
import imgPipeWhite from './img/tuyau_blanc.png';
import imgPipeBlack from './img/tuyau_noir.png';

import imgGaugeEmpty from './img/jauge.png';
import imgGauge1 from './img/jauge_2.gif';
import imgGauge2 from './img/jauge_3.gif';
import imgGauge3 from './img/jauge_4.gif';
import imgSymbols from './img/symboles.png';

const imgGaugesFilled = [
  null,
  imgGauge1,
  imgGauge2,
  imgGauge3,
];

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

const MachineFiolesContainer = styled.div`
  position: absolute;
  top: 275px;
  left: 583px;
  width: 145px;
  height: 210px;

  &.focused::before {
    content: " ";
    position: absolute;
    width: 151px;
    height: 71px;
    top: 152px;
    left: -3px;
    background: url(${imgMachineFiolesFocus}) no-repeat top left;
  }
`;

const Pipes = styled.div`
  display: grid;
  grid-template-columns: repeat(6,19.3px);
  grid-gap: 0;
  grid-auto-rows: 28px;
  position: absolute;
  top: 73px;
  left: 16px;
`;

const Pipe = styled.div`
  width: 18px;
  height: 18px;
  transition: transform 250ms ease-out;
  transform: rotate(${props => (props.rotation - 1) * 90}deg);
  background: url('${imgPipeWhite}') no-repeat center center;
  color: red;
  &.fixed {
    background: url('${imgPipeBlack}') no-repeat center center;
  }
`;

const Gauges = styled.div`
  display: grid;
  grid-template-columns: repeat(6,19.3px);
  grid-gap: 0;
  grid-auto-rows: 30px;
  position: absolute;
  top: 160px;
  left: 20px;
  opacity: ${props => props.focused ? 1 : 0.5};
  transition: opacity 250ms ease;
`;

const Gauge = styled.div`
  width: 12px;
  height: 21px;
`;

const GaugeEmpty = styled(Gauge)`
  background: url('${imgGaugeEmpty}') no-repeat center center;
`;

const GaugeFilled = styled(Gauge)`
  background: url('${props => imgGaugesFilled[props.index]}') no-repeat center center;
`;

const MachineFioles = function({ focused, fioles }) {
  return (
    <MachineFiolesContainer className={`${focused ? 'focused' : ''}`}>
      <Fioles focused={focused}>
        <Fiole className="fiole-0" />
        <Fiole className="fiole-1" />
        <Fiole className="fiole-2" />
        <Fiole className="fiole-3" />
        <Fiole className="fiole-4" />
        <Fiole className="fiole-5" />
      </Fioles>
      <Pipes>
        {fioles.pipes.map((p, i) => (
          <Pipe key={`p${i}`} className={p === 9 ? 'fixed' : ''} rotation={p === 9 ? 1 : p} />
        ))}
      </Pipes>
      <Gauges focused={focused}>
        {fioles.gauges.map((g, i) => {
          return g && g.SOLVED
            ? (<GaugeFilled key={`g${i}`} index={i} />)
            : (<GaugeEmpty key={`g${i}`}/>)
          })}
      </Gauges>
      <img src={imgSymbols} style={{ position: 'absolute', bottom: '6px', left: '13px' }} />
    </MachineFiolesContainer>
  );
}

export default withFocus(MachineFioles);