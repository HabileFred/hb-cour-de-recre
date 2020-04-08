/*
 *
 * BiduleOTron reducer
 *
 */

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

export class ReducerSimon {

  constructor() {
    initialState.simon = {
    };
  }
}

export const simonReducer = new ReducerSimon();