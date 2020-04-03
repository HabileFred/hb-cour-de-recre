/*
 *
 * BiduleOTron reducer
 *
 */
import produce from 'immer';
import { Howl, Howler } from 'howler';

import { PAD_UP, PAD_DOWN, PAD_LEFT, PAD_RIGHT, PIPE_ROTATE, PAD_SUBMIT, PAD_CANCEL, PIPES_CHECK, ONOFF_TOGGLE, BUTTON_PRESSED, BINARY_INPUT, FUSE_TOGGLE, MUSIC_TOGGLE } from './constants';

import sndBackgroundMusic from './sounds/monstre_chambre.mp3';
import sndButtonWrong from './sounds/button_wrong.mp3';
import sndButtonClick from './sounds/button_click.mp3';
import sndButtonClick2 from './sounds/button_click_2.mp3';
import sndPipe from './sounds/cliquet.mp3';

class SoundPlayer {
  constructor() {
    this.sounds = {
      music: new Howl({
        src: sndBackgroundMusic,
        loop: true,
        html5: true,
      }),
      wrong: new Howl({
        src: sndButtonWrong,
      }),
      click: new Howl({
        src: sndButtonClick,
      }),
      click2: new Howl({
        src: sndButtonClick2,
      }),
      pipe: new Howl({
        src: sndPipe,
      }),
    };
  }

  play(name) {
    if (name in this.sounds) {
      this.sounds[name].play();
    }
  }

  stop(name) {
    if (name in this.sounds) {
      this.sounds[name].stop();
    }
  }
}

const soundPlayer = new SoundPlayer();

export const initialState = {
  focus: ['bidule'],

  sounds: {
    music: false,
    sfx: true,
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
    desired: [1, 2, 3, 4, 5],
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
    values: {
      red: false,
      green: false,
      blue: false,
      yellow: false,
      purple: false,
    },
    solution: {
      red: false,
      green: false,
      blue: true,
      yellow: true,
      purple: true,
    },
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

  fuses: {
    feedback: [false, false, false, false],
    values: ['D', 'D', 'D', 'D'],
    solution: ['D', 'G', 'G', 'D'],
    SOLVED: false,
  },

  simon: {

  },

  wires: {
    readiness: {
      top: false,
      bottom: false,
    },
  }
};

/**
 * Checks equality of the values in the given Arrays.
 * @param {Array} a First array
 * @param {Array} b Second Array
 */
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Checks equality of the values in the given Objects.
 * @param {Object} a First Object
 * @param {Object} b Second Object
 */
function objectsEqual(a, b) {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  // If number of properties is different, objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
   // If values of same property are not equal, objects are not equivalent
    if (a[propName] !== b[propName]) {
        return false;
    }
  }
  // If we made it this far, objects are considered equivalent
  return true;
}

/**
 * Increments/decrements `value` by `inc`, applying a 'rotate' to ensure it stays between `min` and `max`.
 * @param {int} value 
 * @param {*} inc 
 * @param {*} min 
 * @param {*} max 
 */
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

/**
 * Increments/decrements `value` by `inc` and ensures it stays between `min` and `max`.
 * @param {int} value 
 * @param {*} inc 
 * @param {*} min 
 * @param {*} max 
 */
function betweenValue(value, inc, min, max) {
  value += inc;
  if (value < min) value = min;
  if (value > max) value = max;
  return value;
}

/**
 * Checks whether the element with ID `focusId` has the focus or not.
 * @param {Object} draft The Store.
 * @param {*} focusId ID of the element to check.
 */
function hasFocus(draft, focusId) {
  return draft.focus.indexOf(focusId) !== -1;
}

/**
 * Changes machines focus.
 * @param {Object} draft The Store.
 * @param {Array} newFocusId IDs of elements to give focus to.
 * @param {Array} oldFocusId IDs of elements to remove focus from.
 */
function setFocus(draft, newFocusId, oldFocusId)  {
  const set = new Set(draft.focus);
  if (oldFocusId) {
    if (Array.isArray(oldFocusId)) {
      oldFocusId.forEach(f => set.delete(f));
    } else {
      set.delete(oldFocusId);
    }
  }
  if (newFocusId) {
    if (Array.isArray(newFocusId)) {
      newFocusId.forEach(f => set.add(f));
    } else {
      set.add(newFocusId);
    }
  }
  draft.focus = [...set];
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
  if (draft.fioles.SOLVED) {
    setFocus(draft, 'lights', 'pipes');
  }
}

function checkPiecesSolved(draft) {
  for (let i = 0; i < draft.pieces.desired.length; i += 1) {
    const p = draft.pieces.desired[i];
    if (draft.pieces.current.indexOf(p) === -1) {
      draft.pieces.SOLVED = false;
      return;
    }
  }
  draft.pieces.SOLVED = true;
  setFocus(draft, 'binary', 'pieces');
}

function handlePadLeft(draft) {
  if (hasFocus(draft, 'pieces')) {
    soundPlayer.play('click');
    draft.pieces.current[draft.pieces.cursor] = cycleValue(
      draft.pieces.current[draft.pieces.cursor],
      -1,
      0,
      draft.pieces.MAX_VALUE,
    );
    checkPiecesSolved(draft);
  } else if (hasFocus(draft, 'bidule')) {
    const v = betweenValue(
      draft.bidule.index,
      -1,
      0,
      (draft.bidule.BIDULE_COUNT - 1)
    );
    if (v !== draft.bidule.index) {
      draft.bidule.index = v;
      soundPlayer.play('click');
    } else {
      soundPlayer.play('wrong');
    }
  } else {
    soundPlayer.play('wrong');
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
    soundPlayer.play('click');
    checkPiecesSolved(draft);
  } else if (hasFocus(draft, 'bidule')) {
    const v = betweenValue(
      draft.bidule.index,
      1,
      0,
      (draft.bidule.BIDULE_COUNT - 1)
    );
    if (v !== draft.bidule.index) {
      draft.bidule.index = v;
      soundPlayer.play('click');
    } else {
      soundPlayer.play('wrong');
    }
  } else {
    soundPlayer.play('wrong');
  }
}

function handlePadDown(draft) {
  if (hasFocus(draft, 'binary')) {
    soundPlayer.play('click');
    draft.binary.index = cycleValue(draft.binary.index, 1, 0, 2);
  } else {
    soundPlayer.play('wrong');
  }
}

function handlePadUp(draft) {
  if (hasFocus(draft, 'binary')) {
    soundPlayer.play('click');
    draft.binary.index = cycleValue(draft.binary.index, -1, 0, 2);
  } else {
    soundPlayer.play('wrong');
  }
}

/**
 * Pad button 'submit' has been pressed.
 */
function handlePadSubmit(draft) {
  if (hasFocus(draft, 'bidule')) {
    setFocus(draft, ['pieces', 'pipes'], 'bidule');
    //setFocus(draft, ['fuses', 'lights', 'binary'], 'bidule');
  } else if (hasFocus(draft, 'fuses')) {
    checkFuses(draft);
  }
}

/**
 * Pad button 'cancel' has been pressed.
 */
function handlePadCancel(draft) {
  if (hasFocus(draft, 'pieces')) {
    setFocus(draft, 'bidule', ['pieces', 'pipes']);
    // DEV setFocus(draft, 'bidule', ['fuses', 'simon']);
  }
}

function checkLights(draft) {
  draft.lights.SOLVED = objectsEqual(draft.lights.values, draft.lights.solution);
  draft.wires.readiness.bottom = draft.lights.SOLVED;
  if (draft.lights.SOLVED) {
    setFocus(draft, null, 'lights');
  }
  checkWiresReadiness(draft);
}

/**
 * @param {*} draft
 * @param {*} colors
 */
function lightsToggle(draft, colors) {
  colors.forEach(c => draft.lights.values[c] = !draft.lights.values[c]);
  checkLights(draft);
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
  } else if (hasFocus(draft, 'pieces')) {
    const cursor = 'GHJKL'.indexOf(button);
    if (cursor !== -1) {
      if (cursor !== draft.pieces.cursor) {
        soundPlayer.play('click2');
        draft.pieces.cursor = cursor;
      }
    } else {
      soundPlayer.play('wrong');
    }
  }
}

function checkBinary(draft) {
  draft.binary.SOLVED = arraysEqual(draft.binary.values, draft.binary.solution);
  if (draft.binary.SOLVED) {
    setFocus(draft, 'fuses', 'binary');
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
  checkBinary(draft);
}

function checkWiresReadiness(draft) {
  if (draft.fuses.SOLVED && draft.wires.SOLVED) {
    setFocus(draft, 'wires', ['fuses', 'lights']);
  }
}

function checkFuses(draft) {
  draft.fuses.feedback = [false, false, false, false];
  let fbIndex = 0;
  draft.fuses.solution.forEach((v, i) => {
    if (draft.fuses.values[i] === v) {
      draft.fuses.feedback[fbIndex] = true;
      fbIndex += 1;
    }
  });
  draft.fuses.SOLVED = fbIndex === draft.fuses.solution.length;
  draft.wires.readiness.top = draft.fuses.SOLVED;
  if (draft.fuses.SOLVED) {
    setFocus(draft, null, 'fuses');
  }
  checkWiresReadiness(draft);
}

function handleFuseToggle(draft, index) {
  if (index < draft.fuses.values.length) {
    let c = draft.fuses.values[index];
    c = (c === 'D') ? 'G' : 'D';
    draft.fuses.values[index] = c;
  }
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
            soundPlayer.play('pipe');
            draft.fioles.pipes[action.index] = cycleValue(
              draft.fioles.pipes[action.index],
              1,
              1,
              4,
            );
          }
        } else {
          soundPlayer.play('wrong');
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

      case FUSE_TOGGLE:
        handleFuseToggle(draft, action.index);
        break;

      case MUSIC_TOGGLE:
        draft.sounds.music = !draft.sounds.music;
        if (draft.sounds.music) {
          soundPlayer.play('music');
        } else {
          soundPlayer.stop('music');
        }
        break;
    }
  });

export default BiduleOTronReducer;
