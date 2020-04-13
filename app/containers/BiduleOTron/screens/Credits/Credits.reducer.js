/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

export class ReducerCredits {

  constructor() {
    initialState.credits = {
    };
  }

  handlePadSubmit() {
    const { credits } = getDraft();
  }

  handlePadCancel() {
    const { credits } = getDraft();
  }

}

export const creditsReducer = new ReducerCredits();