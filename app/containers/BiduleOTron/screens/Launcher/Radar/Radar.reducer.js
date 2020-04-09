/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';
import { betweenValue } from 'BOT/utils';

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
    const draft = getDraft();
    const y = draft.radar.cursor.y;
    draft.radar.cursor.y = betweenValue(y, 1, 0, 3);
    SFX[draft.radar.cursor.y === y ? 'wrong' : 'click']();
  }

  handlePadUp() {
    const draft = getDraft();
    const y = draft.radar.cursor.y;
    draft.radar.cursor.y = betweenValue(y, -1, 0, 3);
    SFX[draft.radar.cursor.y === y ? 'wrong' : 'click']();
  }

  handlePadLeft() {
    SFX.click();
    const draft = getDraft();
    const x = draft.radar.cursor.x;
    draft.radar.cursor.x = betweenValue(x, -1, 0, 3);
    SFX[draft.radar.cursor.x === x ? 'wrong' : 'click']();
  }

  handlePadRight() {
    SFX.click();
    const draft = getDraft();
    const x = draft.radar.cursor.x;
    draft.radar.cursor.x = betweenValue(x, 1, 0, 3);
    SFX[draft.radar.cursor.x === x ? 'wrong' : 'click']();
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