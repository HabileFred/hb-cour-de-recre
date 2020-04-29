/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';
import { betweenValue } from 'BOT/utils';

import ReactGA from 'react-ga';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

class ReducerRadar {
  constructor() {
    initialState.radar = {
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
    if (draft.bidule.SOLVED) {
      const { y } = draft.radar.cursor;
      draft.radar.cursor.y = betweenValue(y, 1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.y === y ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadUp() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const { y } = draft.radar.cursor;
      draft.radar.cursor.y = betweenValue(y, -1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.y === y ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadLeft() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const { x } = draft.radar.cursor;
      draft.radar.cursor.x = betweenValue(x, -1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.x === x ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadRight() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const { x } = draft.radar.cursor;
      draft.radar.cursor.x = betweenValue(x, 1, 0, 3);
      this.updateHasMoved();
      SFX.play(draft.radar.cursor.x === x ? 'wrong' : 'radar');
    } else {
      SFX.wrong();
    }
  }

  handlePadSubmit() {
    const draft = getDraft();
    if (draft.bidule.SOLVED) {
      const { radar } = draft;
      radar.SOLVED =
        radar.cursor.x === radar.solution.x &&
        radar.cursor.y === radar.solution.y;
      if (radar.SOLVED) {
        SFX.success();
        focus.from('radar').next();

        const minutes = Math.ceil((Date.now() - draft.$game.startedAt) / 60000);
        ReactGA.event({
          category: 'Bill-o-tron',
          action: 'Résolu : Radar',
          value: minutes,
        });
      } else {
        SFX.wrong();
      }
    } else {
      SFX.wrong();
    }
  }
}

export const radarReducer = new ReducerRadar();
