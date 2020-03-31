/*
 *
 * BidulOTron reducer
 *
 */
import produce from 'immer';
import { PAD_UP, PAD_DOWN, PAD_LEFT, PAD_RIGHT, PIPE_ROTATE, PAD_SUBMIT, PAD_CANCEL } from './constants';

export const initialState = {
  pad: {
    focus: 'bidule',
  },

  bidule: {
    BIDULE_COUNT: 5,
    index: 0,
    biduleInfos: [
      {
        text1: 'ABCDEFG',
        text2: '1234567',
      },
      {
        text1: 'ZZZZZZZ',
        text2: '0998989',
      },
      {
        text1: 'SSDZDDE',
        text2: '1443549',
      },
      {
        text1: 'ABABABA',
        text2: '1200009',
      },
      {
        text1: 'TOTOTUT',
        text2: '7654321',
      },
    ],
  },

  pieces: {
    MAX_VALUE: 5,
    cursor: 0,
    current: [0, 0, 0, 0, 0],
    desired: [2, 4, 1, 0, 3],
    SOLVED: false,
  },
  fioles: {
    // values from 1 to 4 included
    // 9 is fixed (cannot be rotated)
    pipes: [
      1, 1, 9, 1, 1, 1,
      1, 1, 1, 9, 1, 1,
      1, 1, 1, 1, 1, 1,
    ],
    gauges: [
      null,
      {
        SOLVED: false,
        solution: [
          0, 0, 9, 3, 1, 0,
          0, 0, 3, 9, 0, 0,
          0, 3, 1, 0, 0, 0,
        ]
      },
      {
        SOLVED: false,
        solution: [
          3, 0, 9, 0, 0, 0,
          2, 4, 0, 9, 0, 0,
          0, 2, 4, 0, 0, 0,
        ]
      },
      {
        SOLVED: false,
        solution: [
          2, 4, 9, 0, 0, 0,
          0, 2, 4, 9, 0, 0,
          0, 0, 2, 4, 0, 0,
        ],
      },
      null,
      null,
    ],
    SOLVED: false,
  },
};

function cycleValue(value, inc, min, max) {
  if (value === null) {
    value = 0;
  }
  value += inc;
  const range = (max - min + 1);
  while (value > max) value -= range;
  while (value < min) value += range;
  return value;
}

function betweenValue(value, inc, min, max) {
  value += inc;
  if (value < min) value = min;
  if (value > max) value = max;
  return value;
}

function checkGauge(gauge, pipes) {
  if (gauge && !gauge.SOLVED) {
    for (let i = 0; i < gauge.solution.length; i++) {
      if (gauge.solution[i] && gauge.solution[i] !== pipes[i]) {
        gauge.SOLVED = false;
        return false;
      }
    }
    console.log('Gauge solved!');
    gauge.SOLVED = true;
  }
  return true;
}

function checkGauges(draft) {
  draft.fioles.SOLVED = draft.fioles.gauges.filter(
    l => checkGauge(l, draft.fioles.pipes)
  ).length === draft.fioles.gauges.length;
  console.log('Fioles: solved=', draft.fioles.SOLVED);
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

    case 'bidule':
      draft.bidule.index = betweenValue(
        draft.bidule.index,
        -1,
        0,
        (draft.bidule.BIDULE_COUNT - 1)
      );
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

    case 'bidule':
        draft.bidule.index = betweenValue(
          draft.bidule.index,
          1,
          0,
          (draft.bidule.BIDULE_COUNT - 1)
        );
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

function handlePadSubmit(draft) {
  switch (draft.pad.focus) {
    case 'bidule':
      draft.pad.focus = 'pieces';
      break;
  }
}

function handlePadCancel(draft) {
  switch (draft.pad.focus) {
    case 'pieces':
      draft.pad.focus = 'bidule';
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

      case PAD_SUBMIT:
        handlePadSubmit(draft);
        break;

      case PAD_CANCEL:
        handlePadCancel(draft);
        break;

      case PIPE_ROTATE:
        if (draft.fioles.pipes[action.index] !== 9) {
          draft.fioles.pipes[action.index] = cycleValue(
            draft.fioles.pipes[action.index],
            1,
            1,
            4,
          );
          checkGauges(draft);
        }
        break;
    }
  });

export default BidulOTronReducer;
