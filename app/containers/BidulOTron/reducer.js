/*
 *
 * BidulOTron reducer
 *
 */
import produce from 'immer';
import { PAD_UP, PAD_DOWN, PAD_LEFT, PAD_RIGHT, PIPE_ROTATE } from './constants';

export const initialState = {
  pad: {
    focus: 'pieces',
  },

  pieces: {
    MAX_VALUE: 5,
    cursor: 0,
    current: [0, 0, 0, 0, 0],
    desired: [2, 4, 1, 0, 3],
    SOLVED: false,
  },
  pipes: {
    current: [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    liquide1: {
      SOLVED: false,
      solution: { 0: 2, 7: 3 },
    },
    SOLVED: false,
  },
};

function cycleValue(value, inc, min, max) {
  value += inc;
  const range = (max - min + 1);
  while (value > max) value -= range;
  while (value < min) value += range;
  return value;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function handlePadLeft(draft) {
  switch (draft.pad.focus) {
    case 'pieces':
      draft.pieces.current[draft.pieces.cursor] = cycleValue(
        draft.pieces.current[draft.pieces.cursor],
        -1,
        0,
        draft.pieces.MAX_VALUE,
      );
      draft.pieces.SOLVED = arraysEqual(draft.pieces.current, draft.pieces.desired);
      break;
  }
}

function handlePadRight(draft) {
  switch (draft.pad.focus) {
    case 'pieces':
      draft.pieces.current[draft.pieces.cursor] = cycleValue(
        draft.pieces.current[draft.pieces.cursor],
        1,
        0,
        draft.pieces.MAX_VALUE,
      );
      draft.pieces.SOLVED = arraysEqual(draft.pieces.current, draft.pieces.desired);
      break;
  }
}

function handlePadDown(draft) {
  switch (draft.pad.focus) {
    case 'pieces':
      draft.pieces.cursor = Math.min(draft.pieces.desired.length - 1, draft.pieces.cursor + 1);
      break;
  }
}

function handlePadUp(draft) {
  switch (draft.pad.focus) {
    case 'pieces':
        draft.pieces.cursor = Math.max(0, draft.pieces.cursor - 1);
      break;
  }
}

/* eslint-disable default-case, no-param-reassign */
const BidulOTronReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {

      case PAD_UP:
        handlePadUp(draft);
        break;

      case PAD_DOWN:
        handlePadDown(draft);
        break;

      case PAD_LEFT:
        handlePadLeft(draft);
        break;

      case PAD_RIGHT:
        handlePadRight(draft);
        break;

      case PIPE_ROTATE:
          draft.pipes.current[action.index] = cycleValue(
            draft.pipes.current[action.index],
            1,
            0,
            3,
          );
        break;
    }
  });

export default BidulOTronReducer;
