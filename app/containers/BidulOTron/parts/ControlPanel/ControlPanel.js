/**
 *
 * BidulOTron
 *
 */

import React, { useEffect } from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import withSounds from '../../withSounds';
import sndButton from './sounds/button-1.mp3';
import sndCliquet from './sounds/cliquet.mp3';

import {
  padUp,
  padLeft,
  padRight,
  padDown,
  padSubmit,
  padCancel,

  pipeRotate,
  pipesCheck,

  buttonPressed,
  binaryInput
} from '../../actions';

const ControlPanelContainer = styled.section`
  position: relative;
  width: 100%;
  height: 200px;
`;

const ButtonGroupPipes = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 30px);
  grid-gap: 2px;
  grid-auto-rows: 30px;
  position: absolute;
  top: 0;
  left: 400px;
`;
const buttonPipesLetters = 'AZ ERTQSD F WXCVBN';

const ButtonGroup6Buttons = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 40px);
  position: absolute;
  top: 0;
  left: 700px;
`;

const ButtonGroupBinary = styled.section`
  display: grid;
  grid-template-columns: 40px;
  position: absolute;
  top: 30px;
  left: 700px;
`;

/**
 *
 */
function ControlPanel({ dispatch, store, registerSound, playSound }) {
  
  const onKeyPressed = function (k) {
    switch (k) {
      case 37:
        playSound('button');
        dispatch(padLeft());
        break;
      case 38:
        playSound('button');
        dispatch(padUp());
        break;
      case 39:
        playSound('button');
        dispatch(padRight());
        break;
      case 40:
        playSound('button');
        dispatch(padDown());
        break;

      default:
        if (k >= 65 && k <= 90) {
          const c = String.fromCharCode(k);
          const pipe = buttonPipesLetters.indexOf(c);
          if (pipe !== -1) {
            rotatePipe(pipe);
          }
        }
    }
  };

  useEffect(() => {
    registerSound('button', sndButton);
    registerSound('cliquet', sndCliquet);

    document.title = "Bidul'o-tron | Cour de récré | Habile Bill";

    document.onkeyup = function (e) {
      onKeyPressed(e.keyCode);
      e.stopPropagation();
      return false;
    };
  });

  /**
   * @param {String} key
   */
  function padClicked(key) {
    switch (key) {
      case 'UP':
        playSound('button');
        dispatch(padUp());
        break;
      case 'DOWN':
        playSound('button');
        dispatch(padDown());
        break;
      case 'LEFT':
          playSound('button');
          dispatch(padLeft());
        break;
      case 'RIGHT':
          playSound('button');
          dispatch(padRight());
        break;
      case 'SUBMIT':
        dispatch(padSubmit());
        break;
      case 'CANCEL':
        dispatch(padCancel());
        break;
    }
  }

  let pipeCheckTimeout = null;

  function rotatePipe(index) {
    dispatch(pipeRotate(index));
    playSound('cliquet', 0.2);
    if (pipeCheckTimeout) {
      window.clearTimeout(pipeCheckTimeout);
    }
    pipeCheckTimeout = window.setTimeout(
      () => {
        dispatch(pipesCheck());
        pipeCheckTimeout = null;
      },
      500,
    );
  }

  function pressedButton(button) {
    dispatch(buttonPressed(button));
  }

  function pressedBinaryButton(value) {
    dispatch(binaryInput(value));
  }

  if (!store.fioles) {
    return null;
  }
  return (
    <ControlPanelContainer>
      <div className="pad">
        <button type="button" onClick={() => padClicked('UP')}>UP</button>
        <button type="button" onClick={() => padClicked('DOWN')}>DOWN</button>
        <button type="button" onClick={() => padClicked('LEFT')}>LEFT</button>
        <button type="button" onClick={() => padClicked('RIGHT')}>RIGHT</button>
        {' '}
        <button type="button" onClick={() => padClicked('SUBMIT')}>ENTER</button>
        <button type="button" onClick={() => padClicked('CANCEL')}>CANCEL</button>
      </div>
      <ButtonGroupPipes>
        {[store.fioles.pipes.map((v, i) => 
          v === 9
          ? (<div key={`pipe-button-${i}`}></div>)
          : (
            <button key={`pipe-button-${i}`} type="button" onClick={() => rotatePipe(i)}>
              {buttonPipesLetters[i]}
            </button>
          )
        )]}
      </ButtonGroupPipes>

      <ButtonGroup6Buttons>
        {['G', 'H', 'J', 'K', 'L', 'M'].map(l => (
          <button key={l} type="button" onClick={() => pressedButton(l)}>{l}</button>
        ))}
      </ButtonGroup6Buttons>

      <ButtonGroupBinary>
        <button type="button" onClick={() => pressedBinaryButton(0)}>0</button>
        <button type="button" onClick={() => pressedBinaryButton(1)}>1</button>
      </ButtonGroupBinary>
    </ControlPanelContainer>
  );
}

export default compose(
  withSounds
)(ControlPanel);
