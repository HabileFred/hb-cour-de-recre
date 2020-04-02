/*
 *
 * BiduleOTron reducer
 *
 */
import produce from 'immer';
import { PAD_UP, PAD_DOWN, PAD_LEFT, PAD_RIGHT, PIPE_ROTATE, PAD_SUBMIT, PAD_CANCEL, PIPES_CHECK, ONOFF_TOGGLE, BUTTON_PRESSED, BINARY_INPUT } from './constants';

export const initialState = {
  pad: {
    focused: ['bidule'],
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
    SOLVED: false,
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
      1, 1, 1, 9, 1, 9,
      1, 1, 1, 1, 1, 1,
    ],
    gauges: [
      null,
      {
        SOLVED: false,
        solution: [
          0, 0, 9, 3, 1, 0,
          0, 0, 3, 9, 0, 9,
          0, 3, 1, 0, 0, 0,
        ]
      },
      {
        SOLVED: false,
        solution: [
          3, 0, 9, 0, 0, 0,
          2, 4, 0, 9, 0, 9,
          0, 2, 4, 0, 0, 0,
        ]
      },
      {
        SOLVED: false,
        solution: [
          2, 4, 9, 0, 0, 0,
          0, 2, 4, 9, 0, 9,
          0, 0, 2, 4, 0, 0,
        ],
      },
      null,
      null,
    ],
    SOLVED: false,
  },

  lights: {
    red: false,
    green: false,
    blue: false,
    yellow: false,
    purple: false,
    SOLVED: false,
  },

  binary: {
    SOLVED: false,
    index: 0,
    values: [
      '',
      '',
      '',
    ],
    solution: [
      '0001111',
      '1100010',
      '0011000',
    ]
  },
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

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

function hasFocus(draft, focusId) {
  return draft.pad.focused.indexOf(focusId) !== -1;
}

function setFocus(draft, newFocusId, oldFocusId)  {
  const set = new Set(draft.pad.focused);
  if (oldFocusId) {
    if (Array.isArray(oldFocusId)) {
      oldFocusId.forEach(f => set.delete(f));
    } else {
      set.delete(oldFocusId);
    }
  }
  if (Array.isArray(newFocusId)) {
    newFocusId.forEach(f => set.add(f));
  } else {
    set.add(newFocusId);
  }
  draft.pad.focused = [...set];
}

/**
 * Checks if a Gauge is filled or not.
 * @param {Object} gauge 
 * @param {Array} pipes 
 */
function checkGauge(gauge, pipes) {
  if (gauge && !gauge.SOLVED) {
    for (let i = 0; i < gauge.solution.length; i++) {
      if (gauge.solution[i] && gauge.solution[i] !== pipes[i]) {
        gauge.SOLVED = false;
        return false;
      }
    }
    gauge.SOLVED = true;
  }
  return true;
}

function checkGauges(draft) {
  draft.fioles.SOLVED = draft.fioles.gauges.filter(
    l => checkGauge(l, draft.fioles.pipes)
  ).length === draft.fioles.gauges.length;
}

function handlePadLeft(draft) {
  if (hasFocus(draft, 'pieces')) {
    draft.pieces.current[draft.pieces.cursor] = cycleValue(
      draft.pieces.current[draft.pieces.cursor],
      -1,
      0,
      draft.pieces.MAX_VALUE,
    );
    draft.pieces.SOLVED = arraysEqual(draft.pieces.current, draft.pieces.desired);
  } else if (hasFocus(draft, 'bidule')) {
    draft.bidule.index = betweenValue(
      draft.bidule.index,
      -1,
      0,
      (draft.bidule.BIDULE_COUNT - 1)
    );
  }
}

function handlePadRight(draft) {
  if (hasFocus(draft, 'pieces')) {
    draft.pieces.current[draft.pieces.cursor] = cycleValue(
      draft.pieces.current[draft.pieces.cursor],
      1,
      0,
      draft.pieces.MAX_VALUE,
    );
    draft.pieces.SOLVED = arraysEqual(draft.pieces.current, draft.pieces.desired);
  } else if (hasFocus(draft, 'bidule')) {
      draft.bidule.index = betweenValue(
        draft.bidule.index,
        1,
        0,
        (draft.bidule.BIDULE_COUNT - 1)
      );
    }
}

function handlePadDown(draft) {
  if (hasFocus(draft, 'pieces')) {
    draft.pieces.cursor = Math.min(draft.pieces.desired.length - 1, draft.pieces.cursor + 1);
  }
}

function handlePadUp(draft) {
  if (hasFocus(draft, 'pieces')) {
    draft.pieces.cursor = Math.max(0, draft.pieces.cursor - 1);
  }
}

/**
 * Pad button 'submit' has been pressed.
 */
function handlePadSubmit(draft) {
  if (hasFocus(draft, 'bidule')) {
    setFocus(draft, ['pieces', 'pipes'], 'bidule');
    //draft.bidule.SOLVED = true; // FIXME
  }
}

/**
 * Pad button 'cancel' has been pressed.
 */
function handlePadCancel(draft) {
  if (hasFocus(draft, 'pieces')) {
    setFocus(draft, 'bidule', ['pieces', 'pipes']);
    //draft.bidule.SOLVED = false; // FIXME
  }
}

/**
 * @param {*} draft
 * @param {*} colors
 */
function lightsToggle(draft, colors) {
  colors.forEach(c => draft.lights[c] = !draft.lights[c]);
}

/**
 * A button has been pressed.
 * @param {Object} draft
 * @param {String} button
 */
function handleButtonPressed(draft, button) {
  if (hasFocus(draft, 'lights')) {
    switch (button) {
      case 'G':
        lightsToggle(draft, ['red', 'blue']);
        break;
      case 'H':
          lightsToggle(draft, ['blue', 'green']);
        break;
      case 'J':
          lightsToggle(draft, ['blue', 'red', 'green']);
        break;
      case 'K':
          lightsToggle(draft, ['red', 'yellow', 'purple']);
        break;
      case 'L':
          lightsToggle(draft, ['purple', 'green']);
        break;
      case 'M':
          lightsToggle(draft, ['purple', 'yellow']);
        break;
    }
  }
}

/**
 *
 * @param {*} draft
 * @param {*} value
 */
function handleBinaryInput(draft, value) {
  const idx = draft.binary.index;
  let v = draft.binary.values[idx];
  if (v.length === 7) {
    v = '';
  } else {
    v += String(value);
  }
  draft.binary.values[idx] = v;
}

/* eslint-disable default-case, no-param-reassign */
const BiduleOTronReducer = (state = initialState, action) =>
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
        if (hasFocus(draft, 'pipes')) {
          if (draft.fioles.pipes[action.index] !== 9) {
            draft.fioles.pipes[action.index] = cycleValue(
              draft.fioles.pipes[action.index],
              1,
              1,
              4,
            );
          }
        }
        break;

      case PIPES_CHECK:
        checkGauges(draft);
        break;

      case BUTTON_PRESSED:
        handleButtonPressed(draft, action.button);
        break;

      case BINARY_INPUT:
        handleBinaryInput(draft, action.value);
        break;
    }
  });

export default BiduleOTronReducer;
