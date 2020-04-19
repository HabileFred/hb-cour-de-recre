/*
 *
 * BiduleOTron reducer
 *
 */

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';
import { SFX } from 'BOT/SoundManager';

export class ReducerSimon {

  constructor() {
    initialState.simon = {
      SOLVED: false,
      status: 'Sequence',
      cursor: 0,
      length: 1,
      progress: 0,
      desired: [1, 4, 3, 5, 2, 3, 2],
    };
  }

  playerError() {
    const { simon } = getDraft();
    simon.cursor = 0;
    simon.progress = 0;
    simon.status = 'Sequence';
    focus.controlPanel().removeFocus('Simon');
    SFX.wrong();
  }

  playerSuccess() {
    const { simon } = getDraft();
    simon.cursor = 0;
    simon.length += 1;
    simon.status = 'Sequence';
    focus.controlPanel().removeFocus('Simon');
    SFX.click();
  }

  handleButtonPressed(button) {
    const { simon } = getDraft();
    if (simon.status === 'Sequence' && simon.length > 1) {
      SFX.wrong();
    } else {
      const value = 'yuiop'.indexOf(button) + 1;
      if (value) {
        if (simon.length === 1) {
          simon.cursor = 0;
        }
        if (value !== simon.desired[simon.cursor]) {
          this.playerError();
        } else {
          simon.cursor += 1;
          if (simon.cursor === simon.desired.length) {
            SFX.click(); // TODO Other sound when done?
            simon.SOLVED = true;
            focus.from('simon').next();
          } else {
            if (simon.cursor === simon.length) {
              this.playerSuccess();
            } else {
              SFX.click(2);
            }
          }
        }
      }
    }
  }

  handleAction(action) {
    const { simon } = getDraft();
    if (action.type === 'SIMON_SEQ_PLAY_NEXT') {
      simon.cursor += 1;
      if (simon.cursor === simon.length) {
        simon.cursor = simon.length === 1 ? -1 : 0;
        simon.status = simon.length === 1 ? 'Sequence' : 'Player';
        focus.controlPanel().setFocus('Simon');
      }
    } else if (action.type === 'SIMON_SEQ_GENERATE') {
      simon.desired.forEach((v, i, a) => {
        do {
          v = 1 + Math.floor(Math.random() * 5);
        } while (i && v === a[i - 1]);
        simon.desired[i] = v;
      });
      simon.status = 'Sequence';
      simon.cursor = 0;
    }
  }
}

export const simonReducer = new ReducerSimon();