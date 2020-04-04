import { SFX } from '../SoundManager';
import { arraysEqual } from './utils';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

class ReducerFuses {

  constructor() {
    initialState.fuses = {
      feedback: [false, false, false, false],
      values: ['D', 'D', 'D', 'D'],
      solution: ['D', 'G', 'G', 'D'],
      SOLVED: false,
      nextFocus: null,
    };
  }

  checkWiresReadiness() {
    const draft = getDraft();
    if (draft.fuses.SOLVED && draft.lights.SOLVED) {
      focus.set('wires', ['fuses', 'lights']);
    }
  }

  checkFuses() {
    const draft = getDraft();
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
      focus.from('fuses').next();
    }
    this.checkWiresReadiness();
  }

  handleFuseToggle(index) {
    const draft = getDraft();
    if (index < draft.fuses.values.length) {
      let c = draft.fuses.values[index];
      c = (c === 'D') ? 'G' : 'D';
      draft.fuses.values[index] = c;
      SFX.toggleSwitch();
    }
  }
}

export const fusesReducer = new ReducerFuses();
