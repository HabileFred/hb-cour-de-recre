/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from '../SoundManager';

import { initialState } from './initialState';
import { focus } from './focus';
import { getDraft } from './draft';
import { arraysEqual } from './utils';

export class ReducerHome {

  constructor() {
    initialState.home = {
      cursor: 0,
      password: [-1, -1, -1, -1],
      solution: [0, 4, 5, 6],
      SOLVED: false,
    };
  }

  reset() {
    const { home } = getDraft();
    home.cursor = 0;
    home.password.forEach((v, i) => home.password[i] = -1);
  }

  handleKeypadInput(value) {
    const { home } = getDraft();
    if (value === 'depart' || home.cursor === 4) {
      SFX.wrong();
      this.reset();
    } else {
      SFX.click(2);
      home.password[home.cursor] = value;
      home.cursor += 1;
    }
  }

  handlePadSubmit() {
    const { home } = getDraft();
    if (arraysEqual(home.password, home.solution)) {
      focus.from('password').next();
    } else {
      SFX.wrong();
      this.reset();
    }
  }
}

export const homeReducer = new ReducerHome();