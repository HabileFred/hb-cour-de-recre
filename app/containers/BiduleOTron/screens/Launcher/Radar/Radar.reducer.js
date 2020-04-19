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
    if (draft.bidule.SOLVED) {
      const y = draft.radar.cursor.y;
      draft.radar.cursor.y = betweenValue(y, 1, 0, 3);
      SFX.play(draft.radar.cursor.y === y ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadUp() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const y = draft.radar.cursor.y;
      draft.radar.cursor.y = betweenValue(y, -1, 0, 3);
      SFX.play(draft.radar.cursor.y === y ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadLeft() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const x = draft.radar.cursor.x;
      draft.radar.cursor.x = betweenValue(x, -1, 0, 3);
      SFX.play(draft.radar.cursor.x === x ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadRight() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const x = draft.radar.cursor.x;
      draft.radar.cursor.x = betweenValue(x, 1, 0, 3);
      SFX.play(draft.radar.cursor.x === x ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadSubmit() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const { radar } = draft;
      radar.SOLVED = radar.cursor.x === radar.solution.x && radar.cursor.y === radar.solution.y;
      if (radar.SOLVED) {
        SFX.play('radar');
        focus.from('radar').next();
      } else {
        SFX.wrong();
      }
    } else {
      SFX.wrong();
    }
  }

  handlePadMailbox() {
    const { bidule } = getDraft();
    if (bidule.SOLVED) {
      focus.popup('mail-direction');
    } else {
      SFX.wrong();
    }
  }
}

export const radarReducer = new ReducerRadar();