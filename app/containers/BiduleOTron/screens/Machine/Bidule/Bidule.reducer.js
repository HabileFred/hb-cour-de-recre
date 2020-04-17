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
      index: 0, // FIXME PROD
      solution: 6,
      submitted: false,
      biduleNames: [
        'temporel',
        'parasite',
        'transmetteur',
        'recepteur',
        'aspi_fausses_idees',
        'annule_paroles',
        'aspi_truc', // solution
        'encodeur',
        'anti_bug',
        'ramasse_clou',
        'attrape_eternuements',
        'geolocalisateur',
        'souffle_rien',
        'ramasse_vide',
        'solution',
      ],
      SOLVED: false, // FIXME PROD
    };
  }

  handlePadLeft() {
    const { bidule } = getDraft();
    const v = betweenValue(
      bidule.index,
      -1,
      0,
      (bidule.BIDULE_COUNT - 1)
    );
    if (v !== bidule.index) {
      bidule.index = v;
      bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
  }

  handlePadRight() {
    const { bidule } = getDraft();
    const v = betweenValue(
      bidule.index,
      1,
      0,
      (bidule.BIDULE_COUNT - 1)
    );
    if (v !== bidule.index) {
      bidule.index = v;
      bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
  }

  /**
   * Pad button 'submit' has been pressed.
   */
  handlePadSubmit() {
    const { bidule } = getDraft();
    if (!bidule.submitted) {
      bidule.submitted = true;
    }
    // bidule.SOLVED = true; // FIXME
    focus.from('bidule').next();
    SFX.click();
  }

  /**
   * Pad button 'cancel' has been pressed.
   */
  handlePadCancel() {
    const { bidule } = getDraft();
    bidule.submitted = false;
  }

  handlePadMailbox() {
    focus.popup('mail');
  }
}

export const biduleReducer = new ReducerBidule();