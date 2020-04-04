/**
 *
 * ControlPanel
 *
 */
import React from 'react';
import styled from 'styled-components';

import ButtonGroupWires from './Wires/Wires';
import ButtonGroupPipes from './Pipes/Pipes';
import ButtonGroupKeypad from './Keypad/Keypad';
import ButtonGroupFuses from './Fuses/Fuses';
import ButtonGroupArrows from './Arrows/Arrows';
import ButtonGroupSubmitCancel from './SubmitCancel/SubmitCancel';
import ButtonGroupColors from './Colors/Colors';
import ButtonGroupSounds from './Sounds/Sounds';

const Wrapper = styled.section`
  position: absolute;
  top: 520px;
  width: 100%;
  height: 230px;
`;

/**
 *
 */
function ControlPanel({ dispatch, store }) {
  return (
    <Wrapper>
      <ButtonGroupSounds />
      <ButtonGroupArrows />
      <ButtonGroupColors />
      <ButtonGroupFuses />
      <ButtonGroupPipes />
      <ButtonGroupWires />
      <ButtonGroupKeypad />
      <ButtonGroupSubmitCancel />
    </Wrapper>
  );
}

export default ControlPanel;
