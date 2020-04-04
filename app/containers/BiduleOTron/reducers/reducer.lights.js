/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from '../SoundManager';
import { objectsEqual } from './utils';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

export class ReducerLights {

  constructor() {
    initialState.lights = {
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
    };
  }

  checkLights() {
    const draft = getDraft();
    draft.lights.SOLVED = objectsEqual(draft.lights.values, draft.lights.solution);
    draft.wires.readiness.bottom = draft.lights.SOLVED;
    if (draft.lights.SOLVED) {
      focus.from('lights').next();
    }
  }

  /**
   * @param {*} colors
   */
  lightsToggle(colors) {
    const draft = getDraft();
    colors.forEach(c => draft.lights.values[c] = !draft.lights.values[c]);
    this.checkLights();
  }

  handleButtonPressed(letter) {
    switch (letter.toUpperCase()) {
      case 'G':
        this.lightsToggle(['red', 'blue']);
        break;
      case 'H':
        this.lightsToggle(['blue', 'green']);
        break;
      case 'J':
        this.lightsToggle(['blue', 'red', 'green']);
        break;
      case 'K':
        this.lightsToggle(['red', 'yellow', 'purple']);
        break;
      case 'L':
        this.lightsToggle(['purple', 'green']);
        break;
      case 'M':
        this.lightsToggle(['purple', 'yellow']);
        break;
    }
  }

  handleKeypadInput(value) {
    const draft = getDraft();
    // This is a cheat code for me :P
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
        this.postCheckLights();
      }
    }
  }
}

export const lightsReducer = new ReducerLights();
