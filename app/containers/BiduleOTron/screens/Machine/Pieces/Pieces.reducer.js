import ReactGA from 'react-ga';

import { initialState } from 'BOT/reducers/initialState';
import { focus } from 'BOT/reducers/focus';
import { getDraft } from 'BOT/reducers/draft';
import { cycleValue } from '../../../utils';
import { SFX } from '../../../SoundManager';

export class ReducerPieces {
  constructor() {
    initialState.pieces = {
      MAX_VALUE: 20,
      cursor: 0,
      current: [0, 0, 0, 0, 0],
      desired: [4, 6, 9, 13, 18],
      SOLVED: false,
    };
  }

  checkPiecesSolved() {
    const draft = getDraft();
    for (let i = 0; i < draft.pieces.desired.length; i += 1) {
      const p = draft.pieces.desired[i];
      if (draft.pieces.current.indexOf(p) === -1) {
        draft.pieces.SOLVED = false;
        return;
      }
    }

    if (draft.bidule.index !== draft.bidule.solution) {
      draft.pieces.SOLVED = false;
      draft.error = 'bidule';
    } else {
      delete draft.error;
      draft.pieces.SOLVED = true;
      SFX.success();
      focus.from('pieces').next();
      const minutes = Math.ceil((Date.now() - draft.$game.startedAt) / 60000);
      ReactGA.event({
        category: 'Bill-o-tron',
        action: 'Résolu : Pièces',
        value: minutes,
      });
    }
  }

  handlePadLeft() {
    SFX.click();
    const draft = getDraft();
    draft.pieces.current[draft.pieces.cursor] = cycleValue(
      draft.pieces.current[draft.pieces.cursor],
      -1,
      0,
      draft.pieces.MAX_VALUE,
    );
    this.checkPiecesSolved();
  }

  handlePadRight() {
    SFX.click();
    const draft = getDraft();
    draft.pieces.current[draft.pieces.cursor] = cycleValue(
      draft.pieces.current[draft.pieces.cursor],
      1,
      0,
      draft.pieces.MAX_VALUE,
    );
    this.checkPiecesSolved();
  }

  handleButtonPressed(letter) {
    const draft = getDraft();
    const button = letter.toUpperCase();
    const cursor = 'GHJKL'.indexOf(button);
    if (cursor !== -1) {
      if (cursor !== draft.pieces.cursor) {
        SFX.click(2);
        draft.pieces.cursor = cursor;
      }
    } else {
      SFX.wrong();
    }
  }
}

export const piecesReducer = new ReducerPieces();
