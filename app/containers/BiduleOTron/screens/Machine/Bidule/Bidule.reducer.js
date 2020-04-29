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

export class ReducerBidule {
  constructor() {
    initialState.bidule = {
      konami: {
        expected: 'UUDDLRLRBA',
        index: 0,
        SOLVED: false,
      },
      messageRead: false,
      BIDULE_COUNT: 15,
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
      index: 1,
      SOLVED: false, // FIXME PROD
      ui: { canMoveLeft: true, canMoveRight: true },
    };
  }

  handleKonami(code) {
    const { bidule, pieces } = getDraft();
    const exp = bidule.konami.expected;
    if (code === exp.substr(bidule.konami.index, 1)) {
      bidule.konami.index += 1;
      if (bidule.konami.index === exp.length) {
        bidule.konami.SOLVED = true;
        // On offre :
        // le bon bidule
        bidule.index = bidule.solution;
        bidule.submitted = true;
        // et 3 bonnes pièces déjà séelctionnées
        pieces.current[0] = pieces.desired[0];
        pieces.current[2] = pieces.desired[2];
        pieces.current[4] = pieces.desired[4];
      }
    } else {
      bidule.konami.index = 0;
    }
  }

  updateUiCapabilities() {
    const { bidule } = getDraft();
    bidule.ui.canMoveLeft = bidule.index > 0;
    bidule.ui.canMoveRight = bidule.index < bidule.BIDULE_COUNT - 1;
  }

  handlePadLeft() {
    const { bidule } = getDraft();
    const v = betweenValue(bidule.index, -1, 0, bidule.BIDULE_COUNT - 1);
    if (v !== bidule.index) {
      bidule.index = v;
      bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
    this.updateUiCapabilities();
  }

  handlePadRight() {
    const { bidule } = getDraft();
    const v = betweenValue(bidule.index, 1, 0, bidule.BIDULE_COUNT - 1);
    if (v !== bidule.index) {
      bidule.index = v;
      bidule.submitted = false;
      SFX.click();
    } else {
      SFX.wrong();
    }
    this.updateUiCapabilities();
  }

  /**
   * Pad button 'submit' has been pressed.
   */
  handlePadSubmit() {
    const { bidule } = getDraft();
    if (!bidule.submitted) {
      bidule.submitted = true;
    }

    ReactGA.event({
      category: 'Bill-o-tron',
      action: 'Bidule sélectionné',
      value: bidule.biduleNames[bidule.index],
    });

    // bidule.SOLVED = true; // FIXME
    focus.from('bidule').next();
    SFX.click();
  }

  /**
   * Pad button 'cancel' has been pressed.
   */
  handlePadCancel() {
    const { bidule } = getDraft();
    bidule.submitted = bidule.konami.SOLVED;
  }

  handlePadMailbox() {
    focus.popup('mail-bidule');
    const { bidule } = getDraft();
    bidule.messageRead = true;
  }
}

export const biduleReducer = new ReducerBidule();
