/*
 *
 * BiduleOTron reducer
 *
 */

import { initialState } from './initialState';
import { getDraft } from './draft';

class Focus {
  constructor() {
    initialState.nav = {
      screen: 'machine',
      focus: ['bidule'],
      workflow: {
        bidule: ['pieces', 'pipes'],
        pieces: 'binary',
        pipes: 'lights', // simon
        simon: 'lights',
        binary: 'fuses',
        lights: null,
        fuses: null,
      }
    };
  }

  /**
   * Checks whether the element with ID `focusId` has the focus or not.
   * @param {*} focusId ID of the element to check.
   */
  is(focusId) {
    const draft = getDraft();
    const p = focusId.indexOf('.');
    if (p !== -1) {
      return focusId.substring(0, p) === draft.nav.screen
        && draft.nav.focus.indexOf(focusId.substring(p + 1)) !== -1
      ;
    }
    return draft.nav.focus.indexOf(focusId) !== -1;
  }

  /**
   * Changes machines focus.
   * @param {Array} newFocusId IDs of elements to give focus to.
   * @param {Array} oldFocusId IDs of elements to remove focus from.
   */
  set(newFocusId, oldFocusId)  {
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
        this.set(draft.nav.workflow[current], current);
      }
    };
  }

  replace(newFocusId)  {
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
}

export const focus = new Focus();
