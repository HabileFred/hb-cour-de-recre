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
  FOCUS_NEXT,
  BUTTON_SIMON_PRESSED,
  SHOW_POPUP,
  PAD_MAILBOX,
  GAME_STARTED,
  GAME_COMPLETED,
  TURN_OFF,
  TURN_ON,
  COMPUTER_ON_OFF,
  SET_CONTROL_PANEL_FOCUS,
  REMOVE_CONTROL_PANEL_FOCUS,
  HOME_FIRST_TIME,
  SET_FOCUS,
  REPLACE_FOCUS
} from '../constants';

import { SFX } from '../SoundManager';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

// Import reducers.
import { loginReducer } from 'BOT/screens/Login/Login.reducer';
import { homeReducer } from 'BOT/screens/Home/Home.reducer';
import { creditsReducer } from 'BOT/screens/Credits/Credits.reducer';
// Machine
import { biduleReducer } from 'BOT/screens/Machine/Bidule/Bidule.reducer';
import { binaryReducer } from 'BOT/screens/Machine/Binary/Binary.reducer';
import { fusesReducer } from 'BOT/screens/Machine/Fuses/Fuses.reducer';
import { lightsReducer } from 'BOT/screens/Machine/Lights/Lights.reducer';
import { piecesReducer } from 'BOT/screens/Machine/Pieces/Pieces.reducer';
import { pipesReducer } from 'BOT/screens/Machine/Pipes/Pipes.reducer';
import { simonReducer } from 'BOT/screens/Machine/Simon/Simon.reducer';
import { wiresReducer } from 'BOT/screens/Machine/Wires/Wires.reducer';
// Launcher
import { radarReducer } from 'BOT/screens/Launcher/Radar/Radar.reducer';
import { paramsReducer } from 'BOT/screens/Launcher/Params/Params.reducer';

import { setWorkingDraft } from './draft';

/**
 * Pad button 'cancel' has been pressed.
 */
function handlePadCancel() {
  if (focus.is('login/')) {
    loginReducer.handlePadCancel();
  } else {
    if (focus.is('machine/')) {
      if (focus.is('machine/bidule')) {
        biduleReducer.handlePadCancel();
        focus.setScreen('home');
      } else {
        const draft = getDraft();
        if (!draft.bidule.SOLVED) {
          focus.confirm('confirm', () => focus.setScreen('machine'));
        } else {
          focus.setScreen('home');
        }
      }
    } else {
      if (focus.is('home/')) {
        homeReducer.handlePadCancel();
        SFX.wrong();
      } else {
        focus.setScreen('home');
      }
    }
  }
}

/* eslint-disable default-case, no-param-reassign */
const BiduleOTronReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    setWorkingDraft(draft);

    if (!draft.$game.startedAt) {
      draft.$game.startedAt = Date.now();
      draft.$game.completedAt = null;
    }

    document.activeElement.blur();

    if (focus.inPopup()) {
      if (action.type === PAD_CANCEL) {
        SFX.click(2);
        focus.confirmReject();
      } else if (action.type === PAD_SUBMIT) {
        SFX.click();
        focus.confirmAccept();
      } else {
        SFX.wrong();
      }
      return;
    }

    switch (action.type) {

      case PAD_UP:
        if (focus.is('machine/binary')) {
          binaryReducer.handlePadUp();
        } else if (focus.is('machine/bidule')) {
          biduleReducer.handleKonami('U'); // for Konami code ;)
        } else if (focus.is('launcher/radar')) {
          radarReducer.handlePadUp();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_DOWN:
        if (focus.is('machine/binary')) {
          binaryReducer.handlePadDown();
        } else if (focus.is('machine/bidule')) {
          biduleReducer.handleKonami('D'); // for Konami code ;)
        } else if (focus.is('launcher/radar')) {
          radarReducer.handlePadDown();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_LEFT:
        if (focus.is('machine/pieces')) {
          piecesReducer.handlePadLeft();
        } else if (focus.is('machine/bidule')) {
          biduleReducer.handleKonami('L'); // for Konami code ;)
          biduleReducer.handlePadLeft();
        } else if (focus.is('launcher/radar')) {
          radarReducer.handlePadLeft();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_RIGHT:
        if (focus.is('machine/pieces')) {
          piecesReducer.handlePadRight();
        } else if (focus.is('machine/bidule')) {
          biduleReducer.handleKonami('R'); // for Konami code ;)
          biduleReducer.handlePadRight();
        } else if (focus.is('launcher/radar')) {
          radarReducer.handlePadRight();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_SUBMIT:
        if (focus.is('credits/')) {
          // TODO
        } else if (focus.is('machine/') && draft.bidule.SOLVED) {
          focus.setScreen('home');
        } else if (focus.is('home/')) {
          homeReducer.handlePadSubmit();
        } else if (focus.is('login/password')) {
          loginReducer.handlePadSubmit();
        } else if (focus.is('machine/bidule')) {
          biduleReducer.handlePadSubmit();
        } else if (focus.is('launcher/radar')) {
          radarReducer.handlePadSubmit();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_MAILBOX:
        if (focus.is('login/password')) {
          loginReducer.handlePadMailbox();
        } else if (focus.is('launcher/')) {
          radarReducer.handlePadMailbox();
        } else if (focus.is('machine/')) {
          biduleReducer.handlePadMailbox();
        } else {
          SFX.wrong();
        }
        break;

      case PAD_CANCEL:
        if (focus.is('credits/')) {
          // TODO
        } else {
          handlePadCancel(draft);
        }
        break;

      case PIPE_ROTATE:
        if (focus.is('machine/pipes')) {
          pipesReducer.rotatePipe(action.index);
        } else if (focus.is('machine/bidule') && (action.index === 0 || action.index === 16)) {
          biduleReducer.handleKonami(action.index === 0 ? 'A' : 'B'); // for Konami code ;)
        } else {
          SFX.wrong();
        }
        break;

      case PIPES_CHECK:
        pipesReducer.checkGauges(draft);
        break;

      case BUTTON_SIMON_PRESSED:
        if (focus.is('launcher/params')) {
          paramsReducer.handleButtonPressed(action.button);
        } else if (focus.is('machine/simon')) {
          simonReducer.handleButtonPressed(action.button);
        } else {
          SFX.wrong();
        }
        break;

      case BUTTON_PRESSED:
        if (focus.is('home/')) {
          homeReducer.handleButtonPressed(action.button);
        } else if (focus.is('launcher/params')) {
          paramsReducer.handleButtonPressed(action.button);
        } else {
          if (focus.is('machine/lights')) {
            lightsReducer.handleButtonPressed(action.button);
          }
          if (focus.is('machine/pieces')) {
            piecesReducer.handleButtonPressed(action.button);
          }
          if (!focus.is('machine/pieces') && !focus.is('machine/lights')) {
            SFX.wrong();
          }
        }
        break;

      case KEYPAD_INPUT:
        if (focus.is('launcher/params')) {
          paramsReducer.handleKeypadInput(action.value);
        } else if (focus.is('login/password')) {
          loginReducer.handleKeypadInput(action.value);
        } else if (focus.is('machine/binary')) {
          binaryReducer.handleKeypadInput(action.value);
        } else {
          // Tell the player this is wrong but...
          SFX.wrong();
          // ... there is a cheat code for me :P
          if (focus.is('machine/lights')) {
            lightsReducer.handleKeypadInput(action.value);
          } else if (focus.is('machine/pipes')) {
            pipesReducer.handleKeypadInput(action.value);
          }
        }
        break;

      case FUSE_TOGGLE:
        if (focus.is('machine/fuses')) {
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
        if (focus.is('machine/wires')) {
          wiresReducer.handleSocketSelection('top', action.index);
        } else {
          SFX.wrong();
        }
        break;

      case WIRE_SELECT_BOTTOM_SOCKET:
          if (focus.is('machine/wires')) {
            wiresReducer.handleSocketSelection('bottom', action.index);
          } else {
            SFX.wrong();
          }
        break;

      case SET_SCREEN:
        focus.setScreen(action.screen);
        break;

      case REPLACE_FOCUS:
        focus.replace(action.focusId);
        break;

      case FOCUS_NEXT:
        focus.next();
        break;

      case SHOW_POPUP:
        if (action.acceptHandler) {
          focus.confirm(action.popupId, action.acceptHandler, action.denyHandler);
        } else if (action.closeHandler) {
          focus.popup(action.popupId, action.closeHandler);
        }
        break;

      case GAME_STARTED:
        draft.$game.startedAt = Date.now();
        break;

      case GAME_COMPLETED:
        draft.$game.completedAt = Date.now();
        break;

      case COMPUTER_ON_OFF:
        if (draft.status == 'on') {
          SFX.stopAll();
          localStorage.removeItem('state');
          const newState = { ...initialState, status: 'off' };
          newState.nav.screen = 'off';
          newState.nav.focus = ['off'];
          newState.nav.controlPanel.focus = ['On'];
          SFX.enableSFX(newState.sounds.sfx);
          return newState;
        } else {
          SFX.enableSFX(draft.sounds.sfx);
          SFX.click();
          draft.status = 'on';
          focus.setScreen('loading');
        }
        break;

      case SET_CONTROL_PANEL_FOCUS:
        focus.controlPanel().setFocus(action.focus);
        break;

      case REMOVE_CONTROL_PANEL_FOCUS:
        focus.controlPanel().removeFocus(action.focus);
        break;

      case HOME_FIRST_TIME:
        if (!draft.$game.homeFirstTime) {
          draft.sounds.music = true;
          SFX.music();
          draft.$game.homeFirstTime = true;
        }
        break;

      default:
        simonReducer.handleAction(action);
        break;
    }
  });

export default BiduleOTronReducer;
