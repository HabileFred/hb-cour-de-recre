/*
 *
 * BiduleOTron actions
 *
 */
import {
  PAD_UP,
  PAD_DOWN,
  PAD_LEFT,
  PAD_RIGHT,
  PAD_CANCEL,
  PAD_SUBMIT,
  PIPE_ROTATE,
  PIPES_CHECK,
  BUTTON_PRESSED,
  KEYPAD_INPUT,
  FUSE_TOGGLE,
  MUSIC_TOGGLE,
  SFX_TOGGLE,
  WIRE_SELECT_TOP_SOCKET,
  WIRE_SELECT_BOTTOM_SOCKET,
  SET_SCREEN,
  FOCUS_NEXT,
  BUTTON_SIMON_PRESSED,
  SET_CONTROL_PANEL_FOCUS,
  SHOW_POPUP,
  PAD_MAILBOX,
  GAME_STARTED,
  GAME_COMPLETED,
  TURN_OFF,
  COMPUTER_ON_OFF,
  REMOVE_CONTROL_PANEL_FOCUS,
} from './constants';

export function padUp() {
  return {
    type: PAD_UP,
  };
}

export function padDown() {
  return {
    type: PAD_DOWN,
  };
}

export function padLeft() {
  return {
    type: PAD_LEFT,
  };
}

export function padRight() {
  return {
    type: PAD_RIGHT,
  };
}

export function padSubmit() {
  return {
    type: PAD_SUBMIT,
  };
}

export function padCancel() {
  return {
    type: PAD_CANCEL,
  };
}

export function padMailbox() {
  return {
    type: PAD_MAILBOX,
  };
}

export function pipeRotate(index) {
  return {
    type: PIPE_ROTATE,
    index,
  };
}

export function pipesCheck() {
  return {
    type: PIPES_CHECK,
  };
}

export function buttonPressed(button) {
  return {
    type: BUTTON_PRESSED,
    button,
  };
}

export function buttonSimonPressed(button) {
  return {
    type: BUTTON_SIMON_PRESSED,
    button,
  };
}

export function keypadInput(value) {
  return {
    type: KEYPAD_INPUT,
    value,
  };
}

export function fuseToggle(index) {
  return {
    type: FUSE_TOGGLE,
    index,
  };
}

export function musicToggle() {
  return {
    type: MUSIC_TOGGLE,
  };
}

export function sfxToggle() {
  return {
    type: SFX_TOGGLE,
  };
}

export function wireSelectTopSocket(index) {
  return {
    type: WIRE_SELECT_TOP_SOCKET,
    index,
  };
}

export function wireSelectBottomSocket(index) {
  return {
    type: WIRE_SELECT_BOTTOM_SOCKET,
    index,
  };
}

export function setScreen(screen) {
  return {
    type: SET_SCREEN,
    screen,
  };
}

export function focusNext() {
  return {
    type: FOCUS_NEXT,
  };
}

export function setControlPanelFocus(focus) {
  return {
    type: SET_CONTROL_PANEL_FOCUS,
    focus,
  };
}

export function removeControlPanelFocus(focus) {
  return {
    type: REMOVE_CONTROL_PANEL_FOCUS,
    focus,
  };
}

export function confirm(popupId, acceptHandler, denyHandler) {
  return {
    type: SHOW_POPUP,
    popupId,
    acceptHandler,
    denyHandler,
  };
}

export function popup(popupId, closeHandler) {
  return {
    type: SHOW_POPUP,
    popupId,
    closeHandler,
  };
}

export function gameStarted() {
  return {
    type: GAME_STARTED,
  };
}

export function gameCompleted() {
  return {
    type: GAME_COMPLETED,
  };
}

export function computerOnOff() {
  return {
    type: COMPUTER_ON_OFF,
  };
}
