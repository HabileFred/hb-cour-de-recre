import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import Fiole1 from './img/fioles/fiole_1.svg';
import Fiole2 from './img/fioles/fiole_2.svg';
import Fiole3 from './img/fioles/fiole_3.svg';
import Fiole4 from './img/fioles/fiole_4.svg';
import Fiole5 from './img/fioles/fiole_5.svg';
import Fiole6 from './img/fioles/fiole_6.svg';

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

const MachinePipesContainer = styled.div`
  position: absolute;
  top: 275px;
  left: 583px;
  width: 145px;
  height: 210px;
  z-index: 1;

  .fiole {
    position: absolute;
  }
  .fiole.f1 {
    top: 29px;
    left: 13px;
    width: 26px;
    height: 27px;
  }
  .fiole.f2 {
    top: 16px;
    left: 39px;
    width: 11px;
    height: 40px;
  }
  .fiole.f3 {
    top: 23px;
    left: 51px;
    width: 27px;
    height: 34px;
  }
  .fiole.f4 {
    top: 34px;
    left: 73px;
    width: 22px;
    height: 22px;
  }
  .fiole.f5 {
    top: 20px;
    left: 94px;
    width: 15px;
    height: 36px;
  }
  .fiole.f6 {
    top: -1px;
    left: 108px;
    width: 25px;
    height: 56px;
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
        <Fiole1 className="fiole f1" />
        <Fiole2 className="fiole f2" />
        <Fiole3 className="fiole f3" />
        <Fiole4 className="fiole f4" />
        <Fiole5 className="fiole f5" />
        <Fiole6 className="fiole f6" />
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