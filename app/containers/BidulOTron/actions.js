/*
 *
 * BidulOTron actions
 *
 */

import { PAD_UP, PAD_DOWN, PAD_LEFT, PAD_RIGHT, PIPE_ROTATE } from './constants';

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

export function pipeRotate(index) {
  return {
    type: PIPE_ROTATE,
    index,
  };
}
