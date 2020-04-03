/*
 *
 * BiduleOTron reducer
 *
 */
import produce from 'immer';
import { Howl, Howler } from 'howler';

import { PAD_UP, PAD_DOWN, PAD_LEFT, PAD_RIGHT, PIPE_ROTATE, PAD_SUBMIT, PAD_CANCEL, PIPES_CHECK, ONOFF_TOGGLE, BUTTON_PRESSED, KEYPAD_INPUT, FUSE_TOGGLE, MUSIC_TOGGLE, SFX_TOGGLE, WIRE_SELECT_BOTTOM_SOCKET, WIRE_SELECT_TOP_SOCKET } from './constants';

import { SFX } from './SoundManager';

export const initialState = {
  focus: ['bidule'],

  sounds: {
    music: false,
    sfx: true,
  },

  bidule: {
    nextFocus: ['pieces', 'pipes'],
    BIDULE_COUNT: 5,
    index: 0,
    submitted: false,
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
    nextFocus: 'binary',
    MAX_VALUE: 5,
    cursor: 0,
    current: [0, 0, 0, 0, 0],
    desired: [1, 2, 3, 4, 5],
    SOLVED: false,
  },

  pipes: {
    nextFocus: 'lights', // FIXME simon
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
    nextFocus: null,
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
    nextFocus: 'fuses',
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
    nextFocus: null,
  },

  simon: {
    nextFocus: 'lights',
  },

  wires: {
    readiness: {
      top: false,
      bottom: false,
    },
    sockets: {
      top: 0,
      bottom: 0,
    },
    values: [],
    solution: ['32', '24', '11'],
    SOLVED: false,
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
 * Checks that the given Arrays contain the exact same values.
 * @param {Array} a First array
 * @param {Array} b Second Array
 */
function arraysContainSameValues(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (b.indexOf(a[i]) === -1) {
      return false;
    }
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

function replaceFocus(draft, newFocusId)  {
  const set = new Set();
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
  draft.pipes.SOLVED = draft.pipes.gauges.filter(
    l => checkGauge(l, draft.pipes.pipes)
  ).length === draft.pipes.gauges.length;
  if (draft.pipes.SOLVED) {
    setFocus(draft, draft.pipes.nextFocus, 'pipes');
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
    SFX.click();
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
      draft.bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
  } else {
    SFX.wrong();
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
    SFX.click();
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
      draft.bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
  } else {
    SFX.wrong();
  }
}

function handlePadDown(draft) {
  if (hasFocus(draft, 'binary')) {
    SFX.click();
    draft.binary.index = cycleValue(draft.binary.index, 1, 0, 2);
  } else {
    SFX.wrong();
  }
}

function handlePadUp(draft) {
  if (hasFocus(draft, 'binary')) {
    SFX.click();
    draft.binary.index = cycleValue(draft.binary.index, -1, 0, 2);
  } else {
    SFX.wrong();
  }
}

/**
 * Pad button 'submit' has been pressed.
 */
function handlePadSubmit(draft) {
  if (hasFocus(draft, 'bidule')) {
    if (!draft.bidule.submitted) {
      draft.bidule.submitted = true;
    } else {
      setFocus(draft, ['pieces', 'pipes'], 'bidule');
      //setFocus(draft, ['fuses', 'lights', 'binary'], 'bidule');
    }
  } else if (hasFocus(draft, 'fuses')) {
    checkFuses(draft);
  }
}

/**
 * Pad button 'cancel' has been pressed.
 */
function handlePadCancel(draft) {
  draft.bidule.submitted = false;
  draft.bidule.SOLVED = false;
  draft.fuses.SOLVED = false;
  draft.wires.SOLVED = false;
  draft.lights.SOLVED = false;
  draft.binary.SOLVED = false;
  draft.pieces.SOLVED = false;
  draft.pipes.SOLVED = false;
  if (! hasFocus(draft, 'bidule')) {
    replaceFocus(draft, 'bidule');
  }
}

function postCheckLights(draft) {
  draft.wires.readiness.bottom = draft.lights.SOLVED;
  if (draft.lights.SOLVED) {
    setFocus(draft, draft.lights.nextFocus, 'lights');
  }
  checkWiresReadiness(draft);
}

function checkLights(draft) {
  draft.lights.SOLVED = objectsEqual(draft.lights.values, draft.lights.solution);
  postCheckLights(draft);
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
 * @param {String} letter
 */
function handleButtonPressed(draft, letter) {
  const button = letter.toUpperCase();
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

  if (hasFocus(draft, 'pieces')) {
    const cursor = 'GHJKL'.indexOf(button);
    if (cursor !== -1) {
      if (cursor !== draft.pieces.cursor) {
        SFX.click(2);
        draft.pieces.cursor = cursor;
      }
    } else {
      SFX.wrong();
    }
  }

  if (!hasFocus(draft, 'pieces') && !hasFocus(draft, 'lights')) {
    SFX.wrong();
  }
}

function checkBinary(draft) {
  draft.binary.SOLVED = arraysEqual(draft.binary.values, draft.binary.solution);
  if (draft.binary.SOLVED) {
    setFocus(draft, draft.binary.nextFocus, 'binary');
  }
}

/**
 *
 * @param {*} draft
 * @param {*} value
 */
function handleKeypadInput(draft, value) {
  if (hasFocus(draft, 'binary')) {
    if (value === 0 || value === 1) {
      SFX.click();
      const idx = draft.binary.index;
      let v = draft.binary.values[idx];
      if (v.length >= 7) {
        v = '';
      } else {
        v += String(value);
      }
      draft.binary.values[idx] = v;
      checkBinary(draft);
    } else {
      SFX.wrong();
    }
  } else {
    SFX.wrong();

    // This is a cheat code for me :P
    if (hasFocus(draft, 'lights')) {
      if (!draft.lights.cheatCode || value === 'depart') {
        draft.lights.cheatCode = '';
      }
      if (value !== 'depart') {
        if (draft.lights.cheatCode.length >= 9) {
          draft.lights.cheatCode = '';
        } else {
          draft.lights.cheatCode += String(value);
        }
        if (draft.lights.cheatCode === '10121979') {
          draft.lights.SOLVED = true;
          postCheckLights(draft);
        }
      }
    } else if (hasFocus(draft, 'pipes')) {
      if (!draft.pipes.cheatCode || value === 'depart') {
        draft.pipes.cheatCode = '';
      }
      if (value !== 'depart') {
        if (draft.pipes.cheatCode.length >= 9) {
          draft.pipes.cheatCode = '';
        } else {
          draft.pipes.cheatCode += String(value);
        }
        if (draft.pipes.cheatCode === '22021993') {
          draft.pipes.SOLVED = true;
          setFocus(draft, draft.pipes.nextFocus, 'pipes');
        }
      }
    }
  }
}

function checkWiresReadiness(draft) {
  if (draft.fuses.SOLVED && draft.lights.SOLVED) {
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
    setFocus(draft, draft.fuses.nextFocus, 'fuses');
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

/**
 * 
 * @param {Object} draft The Store.
 * @param {String} which 'top' or 'bottom'
 * @param {int} index 
 */
function handleSocketSelection(draft, which, index) {
  if (hasFocus(draft, 'wires')) {
    // On cherche si un fil a déjà été branché sur cette prise.
    const i = draft.wires.values.findIndex(
      v => which === 'top' ? (v[0] === String(index)) : (v[1] === String(index))
    );
    // Si oui, on retire ce fil.
    if (i !== -1) {
      draft.wires.values.splice(i, 1);
      SFX.wrong();
    }

    // Si un fil a été retiré ou si la prise était déjà sélectionnée,
    // on désélectionne la prise.
    if (i !== -1 || draft.wires.sockets[which] === index) {
      draft.wires.sockets[which] = 0;
    } else {
      // Sinon, on sélectionne la prise.
      draft.wires.sockets[which] = index;
    }

    // Si deux prises sont sélectionnées...
    if (draft.wires.sockets.top && draft.wires.sockets.bottom) {
      // Calcul de l'identifiant du fil branché.
      const v = `${draft.wires.sockets.top}${draft.wires.sockets.bottom}`;
      // Si fil attendu, on le place dans les fils correctement branchés (values).
      if (draft.wires.solution.indexOf(v) !== -1 && draft.wires.values.indexOf(v) === -1) {
        draft.wires.values.push(v);
        // Résolu si 3 fils correctement branchés.
        draft.wires.SOLVED = draft.wires.values.length === 3;
        if (draft.wires.SOLVED) {
          draft.bidule.SOLVED = true;
          SFX.biduleBuilt();
        } else {
          SFX.electricity();
        }
      }
      // Dès que deux prises ont été sélectionnées,
      // et que les vérifications ont été faites,
      // on peut désélectionner les deux prises.
      draft.wires.sockets.top = 0;
      draft.wires.sockets.bottom = 0;
    }
  } else {
    SFX.wrong();
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
          if (draft.pipes.pipes[action.index] !== 9) {
            SFX.tool();
            draft.pipes.pipes[action.index] = cycleValue(
              draft.pipes.pipes[action.index],
              1,
              1,
              4,
            );
          }
        } else {
          SFX.wrong();
        }
        break;

      case PIPES_CHECK:
        checkGauges(draft);
        break;

      case BUTTON_PRESSED:
        handleButtonPressed(draft, action.button);
        break;

      case KEYPAD_INPUT:
        handleKeypadInput(draft, action.value);
        break;

      case FUSE_TOGGLE:
        handleFuseToggle(draft, action.index);
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
        handleSocketSelection(draft, 'top', action.index);
        break;

      case WIRE_SELECT_BOTTOM_SOCKET:
        handleSocketSelection(draft, 'bottom', action.index);
        break;
    }
  });

export default BiduleOTronReducer;
