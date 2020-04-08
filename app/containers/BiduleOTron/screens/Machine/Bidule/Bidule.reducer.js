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

export class ReducerBidule {

  constructor() {
    initialState.bidule = {
      BIDULE_COUNT: 15,
      index: 0,
      submitted: false,
      biduleInfos: [
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' }, // solution
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
        { text1: 'ABCDEFG', text2: '1234567' },
      ],
      SOLVED: false,
    };
  }

  handlePadLeft() {
    const draft = getDraft();
    const v = betweenValue(
      draft.bidule.index,
      -1,
      0,
      (draft.bidule.BIDULE_COUNT - 1)
    );
    if (v !== draft.bidule.index) {
      draft.bidule.index = v;
      draft.bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
  }

  handlePadRight() {
    const draft = getDraft();
    const v = betweenValue(
      draft.bidule.index,
      1,
      0,
      (draft.bidule.BIDULE_COUNT - 1)
    );
    if (v !== draft.bidule.index) {
      draft.bidule.index = v;
      draft.bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
  }

  /**
   * Pad button 'submit' has been pressed.
   */
  handlePadSubmit() {
    const draft = getDraft();
    if (!draft.bidule.submitted) {
      draft.bidule.submitted = true;
      focus.from('bidule').next();
    }
  }

  /**
   * Pad button 'cancel' has been pressed.
   */
  handlePadCancel() {
    const draft = getDraft();
    draft.bidule.submitted = false;
  }
}

export const biduleReducer = new ReducerBidule();