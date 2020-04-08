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

class ReducerRadar {

  constructor() {
    initialState.radar = {
      SOLVED: false,
      cursor: { x: 0, y: 0 },
      solution: { x: 2, y: 2 },
    };
  }

  handlePadDown() {
    SFX.click();
    const draft = getDraft();
    draft.radar.cursor.y = cycleValue(draft.radar.cursor.y, 1, 0, 3);
  }

  handlePadUp() {
    SFX.click();
    const draft = getDraft();
    draft.radar.cursor.y = cycleValue(draft.radar.cursor.y, -1, 0, 3);
  }

  handlePadLeft() {
    SFX.click();
    const draft = getDraft();
    draft.radar.cursor.x = cycleValue(draft.radar.cursor.x, -1, 0, 3);
  }

  handlePadRight() {
    SFX.click();
    const draft = getDraft();
    draft.radar.cursor.x = cycleValue(draft.radar.cursor.x, 1, 0, 3);
  }

  handlePadSubmit() {
    const { radar } = getDraft();
    radar.SOLVED = radar.cursor.x === radar.solution.x && radar.cursor.y === radar.solution.y;
    if (radar.SOLVED) {
      SFX.click();
      focus.from('radar').next();
    } else {
      SFX.wrong();
    }
  }
}

export const radarReducer = new ReducerRadar();