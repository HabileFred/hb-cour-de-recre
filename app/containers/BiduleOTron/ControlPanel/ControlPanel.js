/**
 *
 * ControlPanel
 *
 */
import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ButtonGroupWires from './Wires/Wires';
import ButtonGroupPipes from './Pipes/Pipes';
import ButtonGroupKeypad from './Keypad/Keypad';
import ButtonGroupFuses from './Fuses/Fuses';
import ButtonGroupArrows from './Arrows/Arrows';
import ButtonGroupSubmitCancel from './SubmitCancel/SubmitCancel';
import ButtonGroupColors from './Colors/Colors';
import ButtonGroupSounds from './Sounds/Sounds';
import ButtonGroupSimon from './Simon/Simon';
import { makeSelectControlPanelFocus } from '../selectors';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 230px;
`;

/**
 *
 */
function ControlPanel({ focus }) {
  const focused = (id) => focus.indexOf(id) !== -1;

  return (
    <Wrapper>
      <ButtonGroupSounds />
      <ButtonGroupArrows focused={focused('Arrows')} />
      <ButtonGroupColors focused={focused('ColoredButtons')} />
      <ButtonGroupFuses focused={focused('Fuses')} />
      <ButtonGroupPipes focused={focused('Pipes')} />
      <ButtonGroupWires focused={focused('Wires')} />
      <ButtonGroupKeypad focused={focused('Keypad')} />
      <ButtonGroupSimon focused={focused('Simon')} />
      <ButtonGroupSubmitCancel submitFocused={focused('Submit')} cancelFocused={focused('Cancel')} />
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  focus: makeSelectControlPanelFocus(),
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

export default compose(withConnect)(ControlPanel);
