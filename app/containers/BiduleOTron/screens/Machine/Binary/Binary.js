import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';
import theme from 'BOT/Theme';
import { Digits } from 'BOT/components/Digits/Digits';

import Background from './img/binaire.svg';

const MachineBinaryContainer = styled.div`
  position: absolute;
  top: 102px;
  left: 599px;
  width: 113px;
  height: 176px;
  display: flex;
  flex-flow: column;
  align-items: center;
  opacity: 0;
  padding-top: 5px;
  transition: opacity 250ms ease;
  z-index: 1;

  &.focused {
    opacity: 1;
  }

  &.focused.selected-0 path[class$="step-1-field"],
  &.focused.selected-1 path[class$="step-2-field"],
  &.focused.selected-2 path[class$="step-3-field"] {
    fill: ${theme.focus.color};
    stroke: ${theme.focus.color};
    stroke-width: ${theme.focus.strokeWidth};
  }

  &.focused.step-ok-0 path[class$="step-1-pastille"],
  &.solved.step-ok-0 path[class$="step-1-pastille"],
  &.focused.step-ok-1 path[class$="step-2-pastille"],
  &.solved.step-ok-1 path[class$="step-2-pastille"],
  &.focused.step-ok-2 path[class$="step-3-pastille"],
  &.solved.step-ok-2 path[class$="step-3-pastille"] {
    fill: ${theme.focus.color};
    stroke: ${theme.focus.color};
  }

  &.solved {
    opacity: 1;
  }
`;

const Field = styled.div`
  position: absolute;
  width: 65px;
  height: 28px;
  left: 37px;
  padding: 11px 4px 11px 7px;
  display: flex;

`;
const Field1 = styled(Field)`
  top: 30px;
`;
const Field2 = styled(Field)`
  top: 70px;
`;
const Field3 = styled(Field)`
  top: 111px;
`;

const MachineBinary = function({ binary, focused, solved }) {
  const cls = { focused, solved };
  cls[`selected-${binary.index}`] = true;
  cls['step-ok-0'] = binary.values[0] === binary.solution[0];
  cls['step-ok-1'] = binary.values[1] === binary.solution[1];
  cls['step-ok-2'] = binary.values[2] === binary.solution[2];
  return (
    <MachineBinaryContainer className={classnames(cls)}>
      <Background />
      <Field1 focused={!solved && binary.index === 0}><Digits margins={'-1.75px'} size={11} value={binary.values[0]} /></Field1>
      <Field2 focused={!solved && binary.index === 1}><Digits margins={'-1.75px'} size={11} value={binary.values[1]} /></Field2>
      <Field3 focused={!solved && binary.index === 2}><Digits margins={'-1.75px'} size={11} value={binary.values[2]} /></Field3>
    </MachineBinaryContainer>
  );
};

export default withFocus(MachineBinary);