/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';
import { arraysEqual, cycleValue } from 'BOT/utils';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

class ReducerParams {

  constructor() {
    initialState.params = {
      SOLVED: false,
      velocity: {
        SOLVED: false,
        cursor: 0,
        values: [0, 0, 0, 0, 0, 0],
        solution: [2, 2, 2, 2, 0, 0],
      },
      stability: {
        SOLVED: false,
        cursor: 0,
        values: [0, 0, 0, 0, 0, 0],
        solution: [1, 2, 3, 4, 2, 3],
        buttonValues: {
          'g': 4,
          'h': 1,
          'j': 3,
          'k': 2,
        }
      },
      direction: {
        SOLVED: false,
        cursor: 0,
        values: [],
        solution: ['*', 3, 0, 4],
      },
    };
  }

  handleButtonPressed(button) {
    const { params } = getDraft();
    if ('ghjk'.indexOf(button) !== -1) {
      const { stability: s } = params;
      if (s.cursor === s.solution.length) {
        s.values.splice(0, 6, 0, 0, 0, 0, 0, 0);
        s.cursor = 0;
      } else {
        s.values[s.cursor] = s.buttonValues[button];
        s.SOLVED = arraysEqual(s.values, s.solution);
        s.cursor = cycleValue(s.cursor, 1, 0, s.solution.length);
      }
    } else {
      const value = 'yuiop'.indexOf(button);
      if (value !== -1) {
        const { velocity: v } = params;
        if (v.cursor === v.solution.length) {
          v.values.splice(0, 6, 0, 0, 0, 0, 0, 0);
          v.cursor = 0;
        } else {
          v.values[v.cursor] = value + 1;
          v.SOLVED = arraysEqual(v.values, v.solution);
          v.cursor = cycleValue(v.cursor, 1, 0, v.solution.length);
        }
      } else {
        SFX.wrong();
      }
    }
  }

  handleKeypadInput(value) {
    const { params } = getDraft();
    params.direction.values[params.direction.cursor] = value;
    params.direction.cursor = cycleValue(params.direction.cursor, 1, 0, params.direction.solution.length - 1);
    params.direction.SOLVED = arraysEqual(params.direction.values, params.direction.solution);
  }

}

export const paramsReducer = new ReducerParams();