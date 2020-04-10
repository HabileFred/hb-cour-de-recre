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
      status: 'Sequence',
      sequence: {
        cursor: 0,
        player: [],
        wanted: [0, 3, 2, 4, 1, 2, 1],
      }
    };
  }

  handleButtonPressed(button) {
    console.log(button);
  }
}

export const simonReducer = new ReducerSimon();