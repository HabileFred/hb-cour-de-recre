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
        values: [0, 0, 0, 0],
        solution: [1, 1, 1, 1],
      },
      stability: {
        SOLVED: false,
        values: [0, 0, 0, 0, 0, 0],
        solution: [1, 2, 3, 4, 2, 3],
      },
      direction: {
        SOLVED: false,
        cursor: 0,
        values: [],
        solution: ['depart', 3, 0, 4],
      },
    };
  }

  handleButtonPressed(button) {
    const { params } = getDraft();
    const cursor = 'ghjklm'.indexOf(button);
    if (cursor !== -1) {
      console.log(button, cursor);
      params.stability.values[cursor] = cycleValue(params.stability.values[cursor], 1, 1, 4);
      params.stability.SOLVED = arraysEqual(params.stability.values, params.stability.solution);
    } else {
      const value = 'yuiop'.indexOf(button);
      if (value !== -1) {
        const { velocity } = params;
        velocity.values[velocity.cursor] = value;
        velocity.cursor = cycleValue(velocity.cursor, 1, 0, 3);
        params.velocity.SOLVED = arraysEqual(params.velocity.values, params.velocity.solution);
      }
    }
  }

  handleKeypadInput(value) {
    const { params } = getDraft();
    params.direction.values[params.direction.cursor] = value;
    params.direction.cursor = cycleValue(params.direction.cursor, 1, 0, params.direction.solution.length - 1);
    params.direction.SOLVED = arraysEqual(params.direction.values, params.direction.solution);
    console.log(JSON.stringify(params.direction));
  }

}

export const paramsReducer = new ReducerParams();