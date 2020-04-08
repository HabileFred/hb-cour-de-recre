import { initialState } from './initialState';
import { getDraft } from './draft';

class Focus {
  constructor() {
    initialState.nav = {
      screen: 'login', // FIXME 'login'
      focus: ['password'], // FIXME 'password'
      workflow: {
        login: {
          $start: 'password',
          password: '@home', // FIXME '@loading'
        },
        home: {
          $start: 'menu',
        },
        loading: {
          $start: 'loading',
          loading: '@machine',
        },
        machine: {
          $start: 'bidule',
          bidule: ['pieces', 'pipes'],
          pieces: 'binary',
          pipes: 'lights', // FIXME 'simon'
          simon: 'lights',
          binary: 'fuses',
          lights: null,
          fuses: null,
        },
        launcher: {
          $start: 'radar',
          radar: 'params',
        },
      }
    };
  }

  /**
   * Checks whether the element with ID `focusId` has the focus or not.
   * @param {*} focusId ID of the element to check.
   */
  is(focusId) {
    const draft = getDraft();
    const p = focusId.indexOf('@');
    if (p !== -1) {
      const [f, s] = focusId.split('@');
      return s === draft.nav.screen && (!f.length || draft.nav.focus.indexOf(f) !== -1);
    }
    return draft.nav.focus.indexOf(focusId) !== -1;
  }

  isNot(focusId) {
    return !this.is(focusId);
  }

  /**
   * Changes machines focus.
   * @param {Array} newFocusId IDs of elements to give focus to.
   * @param {Array} oldFocusId IDs of elements to remove focus from.
   */
  set(newFocusId, oldFocusId) {
    const draft = getDraft();
    const set = new Set(draft.nav.focus);
    if (oldFocusId) {
      if (Array.isArray(oldFocusId)) {
        oldFocusId.forEach(f => set.delete(f));
      } else {
        set.delete(oldFocusId);
      }
    }
    if (newFocusId) {
      if (Array.isArray(newFocusId)) {
        newFocusId.forEach(f => set.add(f));
      } else {
        set.add(newFocusId);
      }
    }
    draft.nav.focus = [...set];
  }

  from(current) {
    return {
      next: () => {
        const draft = getDraft();
        const n = draft.nav.workflow[draft.nav.screen][current];
        if (typeof n === 'string' && n.charAt(0) === '@') {
          this.setScreen(n.substring(1));
        } else {
          this.set(n, current);
        }
      }
    };
  }

  next() {
    const draft = getDraft();
    this.from(draft.nav.focus[0]).next();
  }

  replace(newFocusId) {
    const draft = getDraft();
    const set = new Set();
    if (newFocusId) {
      if (Array.isArray(newFocusId)) {
        newFocusId.forEach(f => set.add(f));
      } else {
        set.add(newFocusId);
      }
    }
    draft.nav.focus = [...set];
  }

  setScreen(screen) {
    const draft = getDraft();
    draft.nav.screen = screen;
    this.replace(draft.nav.workflow[screen].$start);
  }
}

export const focus = new Focus();
