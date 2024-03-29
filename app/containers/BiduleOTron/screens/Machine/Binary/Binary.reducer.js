/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';
import { arraysEqual, cycleValue } from 'BOT/utils';

import ReactGA from 'react-ga';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

class ReducerBinary {
  constructor() {
    initialState.binary = {
      SOLVED: false,
      index: 0,
      values: ['', '', ''],
      solution: ['0001111', '1100010', '0011000'],
    };
  }

  reset() {
    const { binary } = getDraft();
    Object.assign(binary, {
      SOLVED: false,
      index: 0,
      values: ['', '', ''],
    });
  }

  check() {
    const draft = getDraft();
    draft.binary.SOLVED = arraysEqual(
      draft.binary.values,
      draft.binary.solution,
    );
    if (draft.binary.SOLVED) {
      SFX.success();
      focus.from('binary').next();
      const minutes = Math.ceil((Date.now() - draft.$game.startedAt) / 60000);
      ReactGA.event({
        category: 'Bill-o-tron',
        action: 'Résolu : Binaire',
        value: minutes,
      });
    }
  }

  handleKeypadInput(value) {
    const draft = getDraft();
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
      if (v === draft.binary.solution[idx]) {
        draft.binary.index += 1;
      }
      this.check();
    } else {
      SFX.wrong();
    }
  }

  handlePadDown() {
    SFX.click();
    const draft = getDraft();
    draft.binary.index = cycleValue(draft.binary.index, 1, 0, 2);
  }

  handlePadUp() {
    SFX.click();
    const draft = getDraft();
    draft.binary.index = cycleValue(draft.binary.index, -1, 0, 2);
  }
}

export const binaryReducer = new ReducerBinary();
