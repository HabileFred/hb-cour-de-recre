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

class ReducerParams {
  constructor() {
    initialState.params = {
      SOLVED: false,
      velocity: {
        SOLVED: false,
        cursor: 0,
        values: [0, 0, 0, 0],
        solution: [2, 2, 2, 2],
      },
      stability: {
        SOLVED: false,
        cursor: 0,
        values: [0, 0, 0, 0, 0, 0],
        solution: [1, 2, 3, 4, 2, 3],
        buttonValues: {
          g: 4,
          h: 1,
          j: 3,
          k: 5,
          l: 2,
        },
      },
      direction: {
        SOLVED: false,
        cursor: 0,
        values: [],
        solution: ['*', 3, 0, 4],
      },
    };
  }

  checkSolved() {
    const { params, $game } = getDraft();
    params.SOLVED =
      params.velocity.SOLVED &&
      params.stability.SOLVED &&
      params.direction.SOLVED;
    if (params.SOLVED) {
      const minutes = Math.ceil((Date.now() - $game.startedAt) / 60000);
      ReactGA.event({
        category: 'Bill-o-tron',
        action: 'Résolu : Paramètres Lance-bidule',
        value: minutes,
      });
    }
  }

  handleButtonPressed(button) {
    const { params } = getDraft();
    if ('ghjkl'.indexOf(button) !== -1) {
      const { stability: s } = params;
      SFX.click();
      if (s.cursor === s.solution.length) {
        s.values.splice(0, 6, 0, 0, 0, 0, 0, 0);
        s.cursor = 0;
      } else {
        s.values[s.cursor] = s.buttonValues[button];
        s.SOLVED = arraysEqual(s.values, s.solution);
        if (s.SOLVED) {
          SFX.success();
        }
        this.checkSolved();
        s.cursor = cycleValue(s.cursor, 1, 0, s.solution.length);
      }
    } else {
      const value = 'yuiop'.indexOf(button);
      if (value !== -1) {
        SFX.click();
        const { velocity: v } = params;
        if (v.cursor >= v.solution.length) {
          v.values.splice(0, v.solution.length, 0, 0, 0, 0);
          v.cursor = 0;
        } else {
          v.values[v.cursor] = value + 1;
          v.values.length = 4;
          v.solution.length = 4;
          v.SOLVED = arraysEqual(v.values, v.solution);
          if (v.SOLVED) {
            SFX.success();
          }
          this.checkSolved();
          v.cursor = cycleValue(v.cursor, 1, 0, v.solution.length);
        }
      } else {
        SFX.wrong();
      }
    }
  }

  handleKeypadInput(value) {
    const { params } = getDraft();
    if (params.direction.cursor == params.direction.solution.length) {
      params.direction.values = [];
      params.direction.cursor = 0;
    } else {
      params.direction.values[params.direction.cursor] = value;
      params.direction.SOLVED = arraysEqual(
        params.direction.values,
        params.direction.solution,
      );
      if (params.direction.SOLVED) {
        SFX.success();
      } else {
        SFX.click();
      }
      this.checkSolved();
      params.direction.cursor = cycleValue(
        params.direction.cursor,
        1,
        0,
        params.direction.solution.length,
      );
    }
  }
}

export const paramsReducer = new ReducerParams();
