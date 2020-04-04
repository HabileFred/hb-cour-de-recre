/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from '../SoundManager';
import { cycleValue } from './utils';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

export class ReducerPipes {

  constructor() {
    initialState.pipes = {
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
    };
  }

  handleKeypadInput(value) {
    const draft = getDraft();
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
        focus.from('pipes').next();
      }
    }
  }

  /**
   * Checks if a Gauge is filled or not.
   * @param {Object} gauge
   * @param {Array} pipes
   */
  checkGauge(gauge, pipes) {
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

  checkGauges() {
    const draft = getDraft();
    draft.pipes.SOLVED = draft.pipes.gauges.filter(
      l => this.checkGauge(l, draft.pipes.pipes)
    ).length === draft.pipes.gauges.length;
    if (draft.pipes.SOLVED) {
      focus.from('pipes').next();
    }
  }

  rotatePipe(index) {
    const draft = getDraft();
    if (draft.pipes.pipes[index] !== 9) {
      SFX.tool();
      draft.pipes.pipes[index] = cycleValue(
        draft.pipes.pipes[index],
        1,
        1,
        4,
      );
    }
  }
}

export const pipesReducer = new ReducerPipes();