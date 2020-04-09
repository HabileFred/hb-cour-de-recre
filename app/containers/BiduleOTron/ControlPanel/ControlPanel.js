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
import { makeSelectControlPanelFocus, makeSelectNav } from '../selectors';

const Wrapper = styled.section`
  position: absolute;
  width: 100%;
  height: 230px;
  bottom: 0;
  // TODO Use Theme filter: drop-shadow(3px 0px 2px rgba(0,0,0,0.3));
`;

/**
 *
 */
function ControlPanel({ controlPanelFocus, nav }) {
  const focused = (id) => controlPanelFocus.indexOf(id) !== -1;

  return (
    <Wrapper>
      <ButtonGroupSounds />
      <ButtonGroupArrows focused={focused('Arrows')} />
      <ButtonGroupColors grayscale={nav.focus.indexOf('lights') !== -1} focused={focused('ColoredButtons')} />
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
  controlPanelFocus: makeSelectControlPanelFocus(),
  nav: makeSelectNav(),
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
