/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from '../SoundManager';
import { betweenValue } from './utils';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

export class ReducerBidule {

  constructor() {
    initialState.bidule = {
      BIDULE_COUNT: 5,
      index: 0,
      submitted: false,
      biduleInfos: [
        {
          text1: 'ABCDEFG',
          text2: '1234567',
        },
        {
          text1: 'ZZZZZZZ',
          text2: '0998989',
        },
        {
          text1: 'SSDZDDE',
          text2: '1443549',
        },
        {
          text1: 'ABABABA',
          text2: '1200009',
        },
        {
          text1: 'TOTOTUT',
          text2: '7654321',
        },
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