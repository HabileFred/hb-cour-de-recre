import { SFX } from 'BOT/SoundManager';
import { initialState } from './initialState';
import { getDraft } from './draft';

class Focus {
  constructor() {
    const initialScreen = 'login'; // FIXME 'login'
    const initialFocus = ['password'];  // FIXME 'password'

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
          password: 'home/', // FIXME? 'loading/'
        },
        home: {
          $start: 'menu',
        },
        loading: {
          $start: 'loading',
          loading: 'machine/',
        },
        machine: {
          $start: 'bidule',
          bidule: ['pieces', 'pipes'],
          pieces: 'binary',
          pipes: 'simon',
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
          'login/password': ['Keypad', 'Submit', 'Cancel'],

          'home/menu': ['ColoredButtons', 'Submit', 'Cancel'],

          'machine/bidule': ['Arrows', 'Submit', 'Cancel'],
          'machine/pieces': ['Arrows', 'ColoredButtons', 'Cancel'],
          'machine/pipes': ['Pipes', 'Cancel'],
          'machine/binary': ['Keypad', 'Cancel'],
          'machine/wires': ['Wires', 'Cancel'],
          'machine/fuses': ['Fuses', 'Submit', 'Cancel'],
          'machine/lights': ['ColoredButtons', 'Cancel'],
          'machine/simon': ['Simon', 'Cancel'],

          'launcher/radar': ['Arrows', 'Cancel'],
          'launcher/params': ['Keypad', 'ColoredButtons', 'Simon', 'Cancel'],
        },
      },
    };

    // Update control panel focus according to initial focus.
    initialState.nav.controlPanel.focus = initialState.nav.controlPanel.definition[`${initialScreen}/${initialFocus[0]}`];
  }

  /**
   * Checks whether the element with ID `focusId` has the focus or not.
   * @param {*} focusId ID of the element to check.
   */
  is(focusId) {
    const draft = getDraft();
    const p = focusId.indexOf('/');
    if (p !== -1) {
      const [s, f] = focusId.split('/');
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
      const key = `${nav.screen}/${f}`;
      const def = nav.controlPanel.definition[key];
      if (def) {
        def.forEach(d => cpf.add(d));
      }
    });
    nav.controlPanel.focus = [...cpf];
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
        if (typeof n === 'string' && n.endsWith('/')) {
          this.setScreen(n.substring(0, n.length - 1));
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
    SFX.popup();
    const { nav } = getDraft();
    nav.popup.id = popupId;
    nav.popup.resolve = submitHandler;
    nav.popup.reject = cancelHandler;

    const { controlPanel } = nav;
    this.prevControlPanelFocus = controlPanel.focus.slice();
    controlPanel.focus.splice(0, controlPanel.focus.length, 'Submit', 'Cancel');

    document.activeElement.blur();
  }

  popupAccept() {
    const { nav } = getDraft();
    const { controlPanel } = nav;
    controlPanel.focus.splice(0, controlPanel.focus.length, ...this.prevControlPanelFocus);
    if (nav.popup.resolve) {
      nav.popup.resolve.call(nav.popup.resolve);
    }
    nav.popup.id = null;
  }

  popupDeny() {
    const { nav } = getDraft();
    const { controlPanel } = nav;
    controlPanel.focus.splice(0, controlPanel.focus.length, ...this.prevControlPanelFocus);
    if (nav.popup.reject) {
      nav.popup.reject.call(nav.popup.reject);
    }
    nav.popup.id = null;
  }

  controlPanel() {
    return {
      setFocus: (fid) => {
        const { nav } = getDraft();
        const { controlPanel } = nav;
        if (controlPanel.focus.indexOf(fid) === -1) {
          controlPanel.focus.push(fid);
        }
      },
      removeFocus: (fid) => {
        const { nav } = getDraft();
        const { controlPanel } = nav;
        const p = controlPanel.focus.indexOf(fid);
        if (p !== -1) {
          controlPanel.focus.splice(p, 1);
        }
      }
    }
  }

}

export const focus = new Focus();
