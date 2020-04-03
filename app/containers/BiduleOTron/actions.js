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
  BINARY_INPUT,
  FUSE_TOGGLE,
  MUSIC_TOGGLE,
  SFX_TOGGLE,
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

export function binaryInput(value) {
  return {
    type: BINARY_INPUT,
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
