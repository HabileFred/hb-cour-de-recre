import { SFX } from 'BOT/SoundManager';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

class ReducerFuses {

  constructor() {
    initialState.fuses = {
      feedback: [true, true, false, false],
      values: ['G', 'G', 'D', 'G'],
      solution: ['D', 'G', 'G', 'D'],
      SOLVED: false,
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
      this.checkFuses();
    }
  }
}

export const fusesReducer = new ReducerFuses();
