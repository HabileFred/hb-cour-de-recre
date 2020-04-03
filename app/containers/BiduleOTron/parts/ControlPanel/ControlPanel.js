/**
 *
 * BiduleOTron
 *
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';

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
  binaryInput,
  fuseToggle,
  musicToggle,
  sfxToggle
} from '../../actions';

const ControlPanelContainer = styled.section`
  position: relative;
  width: 100%;
  height: 230px;
`;

const ButtonGroupPipes = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 40px);
  grid-gap: 2px;
  grid-auto-rows: 40px;
  position: absolute;
  bottom: 10px;
  left: 200px;
`;
const buttonPipesLetters = 'AZ ERTQSD F WXCVBN';

const ButtonGroup6Buttons = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 40px);
  grid-gap: 2px;
  grid-auto-rows: 40px;
  position: absolute;
  bottom: 10px;
  left: 660px;
`;

const ButtonGroupBinary = styled.section`
  display: grid;
  grid-template-columns: 40px;
  grid-gap: 2px;
  grid-auto-rows: 40px;
  position: absolute;
  top: 0px;
  left: 700px;
`;

const ButtonGroupFuses = styled.section`
  display: grid;
  grid-template-columns: 30px;
  grid-gap: 2px;
  grid-auto-rows: 30px;
  position: absolute;
  top: 0;
  left: 630px;
`;

const BoutonGroupArrows = styled.section`
  display: grid;
  grid-template-columns: 40px 40px 40px;
  grid-gap: 2px;
  grid-auto-rows: 40px;
  position: absolute;
  bottom: 10px;
  left: 40px;
`;

const BoutonGroupSubmitCancel = styled.section`
  display: grid;
  grid-template-columns: 100px;
  grid-gap: 2px;
  grid-auto-rows: 30px;
  position: absolute;
  bottom: 10px;
  left: 1150px;
`;

const BoutonGroupSounds = styled.section`
  display: grid;
  grid-template-columns: 50px 50px;
  grid-gap: 2px;
  grid-auto-rows: 40px;
  position: absolute;
  bottom: 146px;
  left: 349px;
`;

/**
 *
 */
function ControlPanel({ dispatch, store }) {

  const onKeyPressed = function (k) {
    switch (k) {
      case 37:
        dispatch(padLeft());
        break;
      case 38:
        dispatch(padUp());
        break;
      case 39:
        dispatch(padRight());
        break;
      case 40:
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
        dispatch(padUp());
        break;
      case 'DOWN':
        dispatch(padDown());
        break;
      case 'LEFT':
          dispatch(padLeft());
        break;
      case 'RIGHT':
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

  function fuseButtonPressed(index) {
    dispatch(fuseToggle(index));
  }

  const { fuses, sounds } = store;

  return (
    <ControlPanelContainer>
      <BoutonGroupSounds>
        <button type="button" onClick={() => dispatch(musicToggle())}>{sounds.music ? 'ON' : 'OFF'}</button>
        <button type="button" onClick={() => dispatch(sfxToggle())}>{sounds.sfx ? 'ON' : 'OFF'}</button>
      </BoutonGroupSounds>

      <BoutonGroupArrows>
        <div />
        <button type="button" onClick={() => padClicked('UP')}>U</button>
        <div />
        <button type="button" onClick={() => padClicked('LEFT')}>&lt;</button>
        <div />
        <button type="button" onClick={() => padClicked('RIGHT')}>&gt;</button>
        <div />
        <button type="button" onClick={() => padClicked('DOWN')}>D</button>
        <div />
      </BoutonGroupArrows>

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

      <ButtonGroupFuses>
        {fuses.values.map((v, i) => (
          <button
            key={`b${i}`}
            type="button"
            className={v === 'D' ? 'right' :'left'} onClick={() => fuseButtonPressed(i)}
          >{v}</button>
        ))}
      </ButtonGroupFuses>

      <BoutonGroupSubmitCancel>
        <button type="button" onClick={() => padClicked('SUBMIT')}>VALIDER</button>
        <button type="button" onClick={() => padClicked('CANCEL')}>ANNULER</button>
      </BoutonGroupSubmitCancel>
    </ControlPanelContainer>
  );
}

export default ControlPanel;
