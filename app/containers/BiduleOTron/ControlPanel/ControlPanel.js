/**
 *
 * ControlPanel
 *
 */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

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

import theme from 'BOT/Theme';

import ComputerKeyboard from './img/ordi_clavier.svg';

const focusKeys = [
  'Arrows', 'ColoredButtons', 'Fuses', 'Pipes', 'Wires', 'Keypad',
  'Simon', 'Mailbox', 'Submit', 'Cancel', 'Lights'
];

const Wrapper = styled.section`
  position: absolute;
  width: 100%;
  height: 230px;
  bottom: 0;
  ${focusKeys.reduce((acc, key) => {
    const k = key.toLowerCase();
    acc += '&.focus-' + k + ' path[class$="_focus_' + k + '"]{stroke-width:' + theme.focus.strokeWidth + ';stroke:' + theme.focus.color + ';fill:' + theme.focus.color + ';}\n';
    return acc;
  }, '')}
`;

/**
 *
 */
function ControlPanel({ controlPanelFocus, nav }) {
  const focused = (id) => controlPanelFocus.indexOf(id) !== -1;

  const classNames ={};
  focusKeys.forEach(key => classNames[`focus-${key.toLowerCase()}`] = focused(key));

  return (
    <Wrapper className={classnames(classNames)}>
      <ComputerKeyboard style={{ position: 'absolute', top: '27px' }} />
      <ButtonGroupSounds />
      <ButtonGroupArrows />
      <ButtonGroupColors grayscale={nav.focus.indexOf('lights') !== -1} />
      <ButtonGroupFuses />
      <ButtonGroupPipes />
      <ButtonGroupWires />
      <ButtonGroupKeypad />
      <ButtonGroupSimon />
      <ButtonGroupSubmitCancel />
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
