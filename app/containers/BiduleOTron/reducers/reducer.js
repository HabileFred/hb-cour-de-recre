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
  SET_SCREEN,
  FOCUS_NEXT
} from '../constants';

import { SFX } from '../SoundManager';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

// Import reducers.
import { biduleReducer } from 'BOT/screens/Machine/Bidule/Bidule.reducer';
import { binaryReducer } from 'BOT/screens/Machine/Binary/Binary.reducer';
import { fusesReducer } from 'BOT/screens/Machine/Fuses/Fuses.reducer';
import { lightsReducer } from 'BOT/screens/Machine/Lights/Lights.reducer';
import { piecesReducer } from 'BOT/screens/Machine/Pieces/Pieces.reducer';
import { pipesReducer } from 'BOT/screens/Machine/Pipes/Pipes.reducer';
import { simonReducer } from 'BOT/screens/Machine/Simon/Simon.reducer';
import { wiresReducer } from 'BOT/screens/Machine/Wires/Wires.reducer';
import { homeReducer } from 'BOT/screens/Home/Home.reducer';
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
  if (! focus.is('bidule@machine')) {
    focus.replace('bidule');
  }
}

/* eslint-disable default-case, no-param-reassign */
const BiduleOTronReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    setWorkingDraft(draft);
    switch (action.type) {

      case PAD_UP:
        if (focus.is('binary@machine')) {
          binaryReducer.handlePadUp();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_DOWN:
        if (focus.is('binary@machine')) {
          binaryReducer.handlePadDown();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_LEFT:
        if (focus.is('pieces@machine')) {
          piecesReducer.handlePadLeft();
        } else if (focus.is('bidule@machine')) {
          biduleReducer.handlePadLeft();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_RIGHT:
        if (focus.is('pieces@machine')) {
          piecesReducer.handlePadRight();
        } else if (focus.is('bidule@machine')) {
          biduleReducer.handlePadRight();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_SUBMIT:
        if (focus.is('password@home')) {
          homeReducer.handlePadSubmit();
        } else if (focus.is('bidule@machine')) {
          biduleReducer.handlePadSubmit();
        } else if (focus.is('fuses@machine')) {
          fusesReducer.checkFuses();
          checkWiresReadiness();
        }
        break;

      case PAD_CANCEL:
        handlePadCancel(draft);
        break;

      case PIPE_ROTATE:
        if (focus.is('pipes@machine')) {
          pipesReducer.rotatePipe(action.index);
        } else {
          SFX.wrong();
        }
        break;

      case PIPES_CHECK:
        pipesReducer.checkGauges(draft);
        break;

      case BUTTON_PRESSED:
        if (focus.is('lights@machine')) {
          lightsReducer.handleButtonPressed(action.button);
          checkWiresReadiness();
        }
        if (focus.is('pieces@machine')) {
          piecesReducer.handleButtonPressed(action.button);
        }
        if (!focus.is('pieces@machine') && !focus.is('lights@machine')) {
          SFX.wrong();
        }
        break;

      case KEYPAD_INPUT:
        if (focus.is('password@home')) {
          homeReducer.handleKeypadInput(action.value);
        } else if (focus.is('binary@machine')) {
          binaryReducer.handleKeypadInput(action.value);
        } else {
          // Tell the player this is wrong but...
          SFX.wrong();
          // ... there is a cheat code for me :P
          if (focus.is('lights@machine')) {
            lightsReducer.handleKeypadInput(action.value);
          } else if (focus.is('pipes@machine')) {
            pipesReducer.handleKeypadInput(action.value);
          }
        }
        break;

      case FUSE_TOGGLE:
        if (focus.is('fuses@machine')) {
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
        if (focus.is('wires@machine')) {
          wiresReducer.handleSocketSelection('top', action.index);
        } else {
          SFX.wrong();
        }
        break;

      case WIRE_SELECT_BOTTOM_SOCKET:
          if (focus.is('wires@machine')) {
            wiresReducer.handleSocketSelection('bottom', action.index);
          } else {
            SFX.wrong();
          }
        break;

      case SET_SCREEN:
        focus.setScreen(action.screen);
        break;

      case FOCUS_NEXT:
        focus.next();
        break;
    }
  });

export default BiduleOTronReducer;
