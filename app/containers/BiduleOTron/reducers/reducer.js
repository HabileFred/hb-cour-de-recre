/*
 *
 * BiduleOTron reducer
 *
 */
import produce from 'immer';

import {
  PAD_UP, PAD_DOWN, PAD_LEFT, PAD_RIGHT, PAD_SUBMIT, PAD_CANCEL,
  PIPE_ROTATE, PIPES_CHECK,
  BUTTON_PRESSED,
  KEYPAD_INPUT,
  FUSE_TOGGLE,
  MUSIC_TOGGLE, SFX_TOGGLE,
  WIRE_SELECT_BOTTOM_SOCKET, WIRE_SELECT_TOP_SOCKET,
  SET_SCREEN
} from '../constants';

import { SFX } from '../SoundManager';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

// Import reducers.
import { biduleReducer } from './reducer.bidule';
import { binaryReducer } from './reducer.binary';
import { fusesReducer } from './reducer.fuses';
import { lightsReducer } from './reducer.lights';
import { piecesReducer } from './reducer.pieces';
import { pipesReducer } from './reducer.pipes';
import { simonReducer } from './reducer.simon';
import { wiresReducer } from './reducer.wires';
import { setWorkingDraft } from './draft';

function checkWiresReadiness() {
  const draft = getDraft();
  if (draft.fuses.SOLVED && draft.lights.SOLVED) {
    focus.set('wires', ['fuses', 'lights']);
  }
}

/**
 * Pad button 'cancel' has been pressed.
 */
function handlePadCancel() {
  biduleReducer.handlePadCancel();
  // TODO
  const draft = getDraft();
  draft.bidule.SOLVED = false;
  draft.fuses.SOLVED = false;
  draft.wires.SOLVED = false;
  draft.lights.SOLVED = false;
  draft.binary.SOLVED = false;
  draft.pieces.SOLVED = false;
  draft.pipes.SOLVED = false;
  if (! focus.is('machine.bidule')) {
    focus.replace('bidule');
  }
}

/* eslint-disable default-case, no-param-reassign */
const BiduleOTronReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    setWorkingDraft(draft);
    switch (action.type) {

      case PAD_UP:
        if (focus.is('machine.binary')) {
          binaryReducer.handlePadUp();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_DOWN:
        if (focus.is('machine.binary')) {
          binaryReducer.handlePadDown();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_LEFT:
        if (focus.is('machine.pieces')) {
          piecesReducer.handlePadLeft();
        } else if (focus.is('machine.bidule')) {
          biduleReducer.handlePadLeft();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_RIGHT:
        if (focus.is('machine.pieces')) {
          piecesReducer.handlePadRight();
        } else if (focus.is('machine.bidule')) {
          biduleReducer.handlePadRight();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_SUBMIT:
        if (focus.is('machine.bidule')) {
          biduleReducer.handlePadSubmit();
        } else if (focus.is('machine.fuses')) {
          fusesReducer.checkFuses();
          checkWiresReadiness();
        }
        break;

      case PAD_CANCEL:
        handlePadCancel(draft);
        break;

      case PIPE_ROTATE:
        if (focus.is('machine.pipes')) {
          pipesReducer.rotatePipe(action.index);
        } else {
          SFX.wrong();
        }
        break;

      case PIPES_CHECK:
        pipesReducer.checkGauges(draft);
        break;

      case BUTTON_PRESSED:
        if (focus.is('machine.lights')) {
          lightsReducer.handleButtonPressed(action.button);
          checkWiresReadiness();
        }
        if (focus.is('machine.pieces')) {
          piecesReducer.handleButtonPressed(action.button);
        }
        if (!focus.is('machine.pieces') && !focus.is('machine.lights')) {
          SFX.wrong();
        }
        break;

      case KEYPAD_INPUT:
        if (focus.is('machine.binary')) {
          binaryReducer.handleKeypadInput(action.value);
        } else {
          // Tell the player this is wrong but...
          SFX.wrong();
          // ... there is a cheat code for me :P
          if (focus.is('machine.lights')) {
            lightsReducer.handleKeypadInput(action.value);
          } else if (focus.is('machine.pipes')) {
            pipesReducer.handleKeypadInput(action.value);
          }
        }
        break;

      case FUSE_TOGGLE:
        if (focus.is('machine.fuses')) {
          fusesReducer.handleFuseToggle(action.index);
        } else {
          SFX.wrong();
        }
        break;

      case MUSIC_TOGGLE:
        draft.sounds.music = !draft.sounds.music;
        SFX.music(draft.sounds.music);
        break;

      case SFX_TOGGLE:
        draft.sounds.sfx = !draft.sounds.sfx;
        SFX.enableSFX(draft.sounds.sfx);
        break;

      case WIRE_SELECT_TOP_SOCKET:
        if (focus.is('machine.wires')) {
          wiresReducer.handleSocketSelection('top', action.index);
        } else {
          SFX.wrong();
        }
        break;

      case WIRE_SELECT_BOTTOM_SOCKET:
          if (focus.is('machine.wires')) {
            wiresReducer.handleSocketSelection('bottom', action.index);
          } else {
            SFX.wrong();
          }
        break;

      case SET_SCREEN:
        draft.nav.screen = action.screen;
        break;
    }
  });

export default BiduleOTronReducer;
