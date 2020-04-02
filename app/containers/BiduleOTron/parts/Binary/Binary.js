import React from 'react';
import styled from 'styled-components';
import withFocus from '../../withFocus';

import imgBinary from './img/binaire.png';
import imgFocusText from './img/focus_champs.png';
import imgPastille1 from './img/pastille_1.png';
import imgPastille1ok from './img/pastille_1_ok.png';
import imgPastille2 from './img/pastille_2.png';
import imgPastille2ok from './img/pastille_2_ok.png';
import imgPastille3 from './img/pastille_3.png';
import imgPastille3ok from './img/pastille_3_ok.png';

import imgDigit0 from './img/0.png';
import imgDigit1 from './img/1.png';

const MachineBinaryContainer = styled.div`
  position: absolute;
  top: 107px;
  left: 606px;
  width: 100px;
  height: 160px;
  display: flex;
  flex-flow: column;
  align-items: center;
  opacity: 0;
  transition: opacity 250ms ease;

  &.focused {
    opacity: 1;
  }

  &.solved {
    opacity: 1;
  }
`;

const Field = styled.div`
  position: absolute;
  width: 65px;
  height: 28px;
  left: 31px;
  font-size: 11px;
  padding: 11px 4px 11px 7px;
  line-height: 11px;
  display: flex;
  background: ${props => props.focused ? 'no-repeat top left url(\'' + imgFocusText + '\')' : 'none'};
`;
const Field1 = styled(Field)`
  top: 33px;
`;
const Field2 = styled(Field)`
  top: 74px;
`;
const Field3 = styled(Field)`
  top: 115px;
`;

const Pastille = styled.div`
  position: absolute;
  width: 16px;
  height: 17px;
  left: 6px;
`;
const Pastille1 = styled(Pastille)`
  top: 33px;
  background: no-repeat top left url('${props => props.solved ? imgPastille1ok : imgPastille1}');
`;
const Pastille2 = styled(Pastille)`
  top: 74px;
  background: no-repeat top left url('${props => props.solved ? imgPastille2ok : imgPastille2}');
`;
const Pastille3 = styled(Pastille)`
  top: 115px;
  background: no-repeat top left url('${props => props.solved ? imgPastille3ok : imgPastille3}');
`;

const BinaryDigit = styled.div`
  width: ${props => props.value === '1' ? 5 : 7}px;
  margin-right: 1px;
  height: 17px;
  background: no-repeat top center url('${props => props.value === '1' ? imgDigit1 : imgDigit0}');
`;

const BinaryDigits = function({ value }) {
  return (<React.Fragment>{String(value).split('').map((c,i) => <BinaryDigit key={i} value={c} />)}</React.Fragment>);
};

const MachineBinary = function({ binary, focused }) {
  return (
    <MachineBinaryContainer className={`${focused ? 'focused' : ''}`}>
      <div className="contents">
        <img src={imgBinary} />
        <Field1 focused={binary.index === 0}><BinaryDigits value={binary.values[0]} /></Field1>
        <Field2 focused={binary.index === 1}>{binary.values[1]}</Field2>
        <Field3 focused={binary.index === 2}>{binary.values[2]}</Field3>
        <Pastille1 solved={binary.values[0] === binary.solution[0]} />
        <Pastille2 solved={binary.values[1] === binary.solution[1]} />
        <Pastille3 solved={binary.values[2] === binary.solution[2]} />
      </div>
    </MachineBinaryContainer>
  );
};

export default withFocus(MachineBinary);