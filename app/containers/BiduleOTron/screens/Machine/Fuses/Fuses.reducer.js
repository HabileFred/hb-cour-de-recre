import { SFX } from 'BOT/SoundManager';

import ReactGA from 'react-ga';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';

class ReducerFuses {
  constructor() {
    initialState.fuses = {
      feedback: {
        values: [false, false, false, false],
        status: 'animationStopped',
      },
      prev: ['M', 'G', 'M', 'M'],
      values: ['G', 'M', 'D', 'G'],
      solution: ['D', 'G', 'G', 'D'],
      SOLVED: false,
    };
  }

  checkWiresReadiness() {
    const draft = getDraft();
    if (draft.fuses.SOLVED && draft.lights.SOLVED) {
      focus.set('wires', ['fuses', 'lights']);
    }
  }

  checkFuses() {
    const { fuses, wires, $game } = getDraft();
    fuses.feedback.values = [false, false, false, false];
    fuses.feedback.status = 'shouldAnimate';
    let fbIndex = 0;
    fuses.solution.forEach((v, i) => {
      if (fuses.values[i] === v) {
        fuses.feedback.values[fbIndex] = true;
        fbIndex += 1;
      }
    });
    fuses.SOLVED = fbIndex === fuses.solution.length;
    wires.readiness.top = fuses.SOLVED;
    if (fuses.SOLVED) {
      SFX.success();
      focus.from('fuses').next();
      const minutes = Math.ceil((Date.now() - $game.startedAt) / 60000);
      ReactGA.event({
        category: 'Bill-o-tron',
        action: 'Résolu : Fusibles',
        value: minutes,
      });
    }
    this.checkWiresReadiness();
  }

  handleFuseToggle(index) {
    const { fuses } = getDraft();
    if (fuses.feedback.status === 'isAnimating') {
      SFX.wrong();
    } else if (index < fuses.values.length) {
      const c = fuses.values[index];
      if (c === 'D' || c === 'G') {
        fuses.values[index] = 'M';
      } else {
        fuses.values[index] = fuses.prev[index] === 'G' ? 'D' : 'G';
      }
      fuses.prev[index] = c;
      SFX.play('toggleSwitch');
      this.checkFuses();
    }
  }

  handleAction(action) {
    const { fuses } = getDraft();
    if (action.type === 'FUSES_FEEDBACK_ANIMATION_STOPPED') {
      fuses.feedback.status = 'animationStopped';
      focus.controlPanel().setFocus('Fuses');
    } else if (action.type === 'FUSES_FEEDBACK_ANIMATION_STARTED') {
      fuses.feedback.status = 'isAnimating';
      focus.controlPanel().removeFocus('Fuses');
    }
  }
}

export const fusesReducer = new ReducerFuses();
