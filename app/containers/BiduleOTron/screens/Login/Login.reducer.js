/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';
import { arraysEqual } from 'BOT/utils';

export class ReducerLogin {

  constructor() {
    initialState.login = {
      cursor: 0,
      password: [-1, -1, -1, -1],
      solution: [0, 4, 5, 6],
      SOLVED: false,
    };
  }

  reset() {
    SFX.wrong();
    const { login } = getDraft();
    login.cursor = 0;
    login.password.forEach((v, i) => login.password[i] = -1);
  }

  handleKeypadInput(value) {
    const { login } = getDraft();
    if (value === '*' || login.cursor === 4) {
      this.reset();
    } else {
      SFX.click(2);
      login.password[login.cursor] = value;
      login.cursor += 1;
    }
  }

  handlePadSubmit() {
    const { login } = getDraft();
    if (arraysEqual(login.password, login.solution)) {
      SFX.click();
      login.SOLVED = true;
      focus.from('password').next();
    } else {
      this.reset();
    }
  }

  handlePadCancel() {
    this.reset();
  }

  handlePadMailbox() {
    SFX.click();
    focus.popup('mail');
  }
}

export const loginReducer = new ReducerLogin();