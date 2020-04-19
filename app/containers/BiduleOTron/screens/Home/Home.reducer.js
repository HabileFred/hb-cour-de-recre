/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

export class ReducerHome {

  constructor() {
    initialState.home = {
      cursor: -1,
    };
  }

  handleButtonPressed(button) {
    const { home } = getDraft();
    if (button === 'k') {
      SFX.click();
      home.cursor = 0;
    } else if (button === 'l') {
      SFX.click();
      home.cursor = 1;
    } else {
      SFX.wrong();
    }
  }

  handlePadSubmit() {
    const { home } = getDraft();
    if (home.cursor === 0) {
      SFX.click();
      focus.setScreen('machine');
    } else if (home.cursor === 1) {
      SFX.click();
      focus.setScreen('launcher');
    } else {
      SFX.wrong();
    }
  }

  handlePadCancel() {
    const { home } = getDraft();
    home.cursor = -1;
  }

}

export const homeReducer = new ReducerHome();