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
      enabled: false,
      SOLVED: false,
      cursor: { x: 0, y: 0, hasMoved: false },
      solution: { x: 2, y: 2 },
    };
  }

  updateHasMoved() {
    const { radar } = getDraft();
    radar.cursor.hasMoved = radar.cursor.x !== 0 || radar.cursor.y !== 0;
  }

  handlePadDown() {
    const draft = getDraft();
    if (draft.bidule.SOLVED && draft.radar.enabled) {
      const y = draft.radar.cursor.y;
      draft.radar.cursor.y = betweenValue(y, 1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.y === y ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadUp() {
    const draft = getDraft();
    if (draft.bidule.SOLVED && draft.radar.enabled) {
      const y = draft.radar.cursor.y;
      draft.radar.cursor.y = betweenValue(y, -1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.y === y ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadLeft() {
    const draft = getDraft();
    if (draft.bidule.SOLVED && draft.radar.enabled) {
      const x = draft.radar.cursor.x;
      draft.radar.cursor.x = betweenValue(x, -1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.x === x ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadRight() {
    const draft = getDraft();
    if (draft.bidule.SOLVED && draft.radar.enabled) {
      const x = draft.radar.cursor.x;
      draft.radar.cursor.x = betweenValue(x, 1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.x === x ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadSubmit() {
    const draft = getDraft();
    if (draft.bidule.SOLVED && draft.radar.enabled) {
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
    const { bidule, radar } = getDraft();
    if (bidule.SOLVED) {
      radar.enabled = true;
      focus.popup('mail-direction');
    } else {
      SFX.wrong();
    }
  }
}

export const radarReducer = new ReducerRadar();