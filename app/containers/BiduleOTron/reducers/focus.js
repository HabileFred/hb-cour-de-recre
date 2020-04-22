import { SFX } from 'BOT/SoundManager';
import { initialState } from './initialState';
import { getDraft } from './draft';

class Focus {
  constructor() {
    const initialScreen = 'off'; // FIXME 'login'
    const initialFocus = ['off'];  // FIXME 'password'

    initialState.nav = {
      popup: {
        id: null,
        resolve: null,
        reject: null,
      },
      screen: initialScreen,
      focus: initialFocus,
      workflow: {
        off: {
          $start: 'off',
          off: 'login/',
        },
        loading: {
          $start: 'loading',
          loading: 'login/',
        },
        login: {
          $start: 'password',
          password: 'home/',
        },
        home: {
          $start: 'menu',
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
          params: 'credits/',
        },
        credits: {
          $start: 'credits',
          credits: null,
        },
      },
      controlPanel: {
        focus: ['ColoredButtons', 'Submit', 'Cancel'],
        definition: {
          'off/off': ['On'],

          'login/password': ['Keypad', 'Mailbox', 'Submit', 'Cancel'],

          'home/menu': ['ColoredButtons', 'Submit', 'Cancel'],

          'machine/bidule': ['Arrows', 'Submit', 'Cancel', 'Mailbox'],
          'machine/pieces': ['Arrows', 'ColoredButtons', 'Cancel', 'Mailbox'],
          'machine/pipes': ['Pipes', 'Cancel', 'Mailbox'],
          'machine/binary': ['Keypad', 'Cancel', 'Arrows', 'Mailbox'],
          'machine/wires': ['Wires', 'Cancel', 'Mailbox'],
          'machine/fuses': ['Fuses', 'Submit', 'Cancel', 'Mailbox'],
          'machine/lights': ['ColoredButtons', 'Cancel', 'Mailbox'],
          'machine/simon': ['Simon', 'Cancel', 'Mailbox'],

          'launcher/radar': ['Arrows', 'Submit', 'Cancel', 'Mailbox'],
          'launcher/params': ['Keypad', 'ColoredButtons', 'Simon', 'Cancel'],

          'credits/credits': ['Submit', 'Cancel'],
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
    const { nav } = getDraft();
    nav.screen = screen;
    if (focus) {
      this.replace(focus);
    } else if (nav.workflow[screen] && nav.workflow[screen].$start) {
      this.replace(nav.workflow[screen].$start);
    }
  }

  popup(popup, closeHandler) {
    let popupId;
    let popupCloseButton = 'Cancel';
    if (typeof popup === 'string') {
      popupId = popup;
    } else if (popup.id) {
      popupId = popup.id;
      if (popup.closeButton) {
        popupCloseButton = popup.closeButton;
      }
    }
    const { nav } = getDraft();
    nav.popup.id = popupId;
    nav.popup.reject = closeHandler;
    const { controlPanel } = nav;
    this.prevControlPanelFocus = controlPanel.focus.slice();
    controlPanel.focus.splice(0, controlPanel.focus.length, popupCloseButton);
    document.activeElement.blur();
  }

  confirm(popupId, submitHandler, cancelHandler) {
    SFX.popup();
    const { nav } = getDraft();
    nav.popup.id = popupId;
    nav.popup.resolve = submitHandler;
    nav.popup.reject = cancelHandler;

    const { controlPanel } = nav;
    this.prevControlPanelFocus = controlPanel.focus.slice();
    controlPanel.focus.splice(0, controlPanel.focus.length, 'Cancel');
    if (nav.popup.resolve) {
      controlPanel.focus.push('Submit');
    }

    document.activeElement.blur();
  }

  confirmAccept() {
    const { nav } = getDraft();
    const { controlPanel } = nav;
    controlPanel.focus.splice(0, controlPanel.focus.length, ...this.prevControlPanelFocus);
    if (nav.popup.resolve) {
      nav.popup.resolve.call(nav.popup.resolve);
    } else if (nav.popup.reject) {
      nav.popup.reject.call(nav.popup.reject);
    }
    nav.popup.id = null;
  }

  confirmReject() {
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
        if (fid === null) {
          controlPanel.focus.length = 0;
        } else if (controlPanel.focus.indexOf(fid) === -1) {
          controlPanel.focus.push(fid);
        }
      },
      removeFocus: (fid) => {
        const { nav } = getDraft();
        const { controlPanel } = nav;
        if (Array.isArray(fid)) {
          fid.forEach(f => {
            const p = controlPanel.focus.indexOf(f);
            if (p !== -1) {
              controlPanel.focus.splice(p, 1);
            }
          });
        } else {
          const p = controlPanel.focus.indexOf(fid);
          if (p !== -1) {
            controlPanel.focus.splice(p, 1);
          }
        }
      }
    }
  }

}

export const focus = new Focus();
