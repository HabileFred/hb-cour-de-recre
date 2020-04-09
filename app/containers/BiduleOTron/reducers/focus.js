import { initialState } from './initialState';
import { getDraft } from './draft';

class Focus {
  constructor() {
    const initialScreen = 'home'; // FIXME 'login'
    const initialFocus = ['menu'];  // FIXME 'password'

    initialState.nav = {
      popup: {
        id: null,
        resolve: null,
        reject: null,
      },
      screen: initialScreen,
      focus: initialFocus,
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
      },
      controlPanel: {
        focus: ['ColoredButtons', 'Submit', 'Cancel'],
        definition: {
          'menu@home': ['ColoredButtons', 'Submit', 'Cancel'],
          'bidule@machine': ['Arrows', 'Submit', 'Cancel'],
          'pieces@machine': ['Arrows', 'ColoredButtons', 'Cancel'],
          'pipes@machine': ['Pipes', 'Cancel'],
          'binary@machine': ['Keypad', 'Cancel'],
          'wires@machine': ['Wires', 'Cancel'],
          'fuses@machine': ['Fuses', 'Submit', 'Cancel'],
          'lights@machine': ['ColoredButtons', 'Cancel'],
          'simon@machine': ['Simon', 'Cancel'],

          'radar@launcher': ['Arrows', 'Cancel'],
          'params@launcher': ['Keypad', 'ColoredButtons', 'Simon', 'Cancel'],
        },
      },
    };

    // Update control panel focus according to initial focus.
    initialState.nav.controlPanel.focus = initialState.nav.controlPanel.definition[`${initialFocus[0]}@${initialScreen}`];
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

  inPopup() {
    const { nav } = getDraft();
    return nav.popup.id !== null;
  }

  isNot(focusId) {
    return !this.is(focusId);
  }

  updateControlPanelFocus() {
    const { nav } = getDraft();
    const cpf = new Set();
    nav.focus.forEach(f => {
      const key = `${f}@${nav.screen}`;
      const def = nav.controlPanel.definition[key];
      if (def) {
        def.forEach(d => cpf.add(d));
      }
    });
    nav.controlPanel.focus = [...cpf];
    console.log('Updated control panel focus:', nav.controlPanel.focus);
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
    this.updateControlPanelFocus();
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
    this.updateControlPanelFocus();
  }

  setScreen(screen, focus) {
    const draft = getDraft();
    draft.nav.screen = screen;
    this.replace(focus ? focus : draft.nav.workflow[screen].$start);
  }

  popup(popupId, submitHandler, cancelHandler) {
    const { nav } = getDraft();
    nav.popup.id = popupId;
    nav.popup.resolve = submitHandler;
    nav.popup.reject = cancelHandler;

    const { controlPanel } = nav;
    this.prevControlPanelFocus = controlPanel.focus.slice();
    controlPanel.focus.splice(0, controlPanel.focus.length, 'Submit', 'Cancel');
  }

  popupAccept() {
    const { nav } = getDraft();
    nav.popup.id = null;

    const { controlPanel } = nav;
    controlPanel.focus.splice(0, controlPanel.focus.length, ...this.prevControlPanelFocus);
    if (nav.popup.resolve) {
      nav.popup.resolve.call(nav.popup.resolve);
    }
    console.log(JSON.stringify(nav.popup));
  }

  popupDeny() {
    const { nav } = getDraft();
    nav.popup.id = null;

    const { controlPanel } = nav;
    controlPanel.focus.splice(0, controlPanel.focus.length, ...this.prevControlPanelFocus);
    if (nav.popup.reject) {
      nav.popup.reject.call(nav.popup.reject);
    }
    console.log(JSON.stringify(nav.popup));
  }

}

export const focus = new Focus();
