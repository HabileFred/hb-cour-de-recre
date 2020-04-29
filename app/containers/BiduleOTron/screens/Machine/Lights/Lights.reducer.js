/*
 *
 * BiduleOTron reducer
 *
 */
import { objectsEqual } from 'BOT/utils';
import { SFX } from 'BOT/SoundManager';

import ReactGA from 'react-ga';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

export class ReducerLights {
  constructor() {
    initialState.lights = {
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

  checkWiresReadiness() {
    const draft = getDraft();
    if (draft.fuses.SOLVED && draft.lights.SOLVED) {
      focus.set('wires', ['fuses', 'lights']);
    }
  }

  checkLights() {
    const draft = getDraft();
    draft.lights.SOLVED = objectsEqual(
      draft.lights.values,
      draft.lights.solution,
    );
    draft.wires.readiness.bottom = draft.lights.SOLVED;
    if (draft.lights.SOLVED) {
      SFX.success();
      const minutes = Math.ceil((Date.now() - draft.$game.startedAt) / 60000);
      ReactGA.event({
        category: 'Bill-o-tron',
        action: 'Résolu : Loupiottes',
        value: minutes,
      });
    }
    this.checkWiresReadiness();
  }

  /**
   * @param {*} colors
   */
  lightsToggle(colors) {
    SFX.click();
    const draft = getDraft();
    colors.forEach(c => (draft.lights.values[c] = !draft.lights.values[c]));
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
        this.lightsToggle(['red', 'yellow', 'purple', 'blue']);
        break;
      case 'L':
        this.lightsToggle(['purple', 'green']);
        break;
      case 'M':
        this.lightsToggle(['purple', 'yellow']);
        break;
      default:
        SFX.wrong();
    }
  }

  handleKeypadInput(value) {
    const draft = getDraft();
    // This is a cheat code for me :P
    if (!draft.lights.cheatCode || value === '*') {
      draft.lights.cheatCode = '';
    }
    if (value !== '*') {
      if (draft.lights.cheatCode.length >= 9) {
        draft.lights.cheatCode = '';
      } else {
        draft.lights.cheatCode += String(value);
      }
      if (draft.lights.cheatCode === '10121979') {
        Object.assign(draft.lights.values, draft.lights.solution);
        this.checkLights();
      }
    }
  }
}

export const lightsReducer = new ReducerLights();
