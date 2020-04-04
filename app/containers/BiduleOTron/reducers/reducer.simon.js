/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from '../SoundManager';
import { arraysEqual } from './utils';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';

export class ReducerSimon {

  constructor() {
    initialState.simon = {
      nextFocus: 'lights',
    };
  }
}

export const simonReducer = new ReducerSimon();