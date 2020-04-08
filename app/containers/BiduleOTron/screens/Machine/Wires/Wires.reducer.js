/*
 *
 * BiduleOTron reducer
 *
 */
import { SFX } from 'BOT/SoundManager';

import { initialState } from 'BOT/reducers/initialState';
import { getDraft } from 'BOT/reducers/draft';

export class ReducerWires {

  constructor() {
    initialState.wires = {
      readiness: {
        top: false,
        bottom: false,
      },
      sockets: {
        top: 0,
        bottom: 0,
      },
      values: [],
      solution: ['32', '24', '11'],
      SOLVED: false,
    };
  }

  handleSocketSelection(which, index) {
    const draft = getDraft();
    // On cherche si un fil a déjà été branché sur cette prise.
    const i = draft.wires.values.findIndex(
      v => which === 'top' ? (v[0] === String(index)) : (v[1] === String(index))
    );
    // Si oui, on retire ce fil.
    if (i !== -1) {
      draft.wires.values.splice(i, 1);
      SFX.wrong();
    }

    // Si un fil a été retiré ou si la prise était déjà sélectionnée,
    // on désélectionne la prise.
    if (i !== -1 || draft.wires.sockets[which] === index) {
      draft.wires.sockets[which] = 0;
    } else {
      // Sinon, on sélectionne la prise.
      draft.wires.sockets[which] = index;
    }

    // Si deux prises sont sélectionnées...
    if (draft.wires.sockets.top && draft.wires.sockets.bottom) {
      // Calcul de l'identifiant du fil branché.
      const v = `${draft.wires.sockets.top}${draft.wires.sockets.bottom}`;
      // Si fil attendu, on le place dans les fils correctement branchés (values).
      if (draft.wires.solution.indexOf(v) !== -1 && draft.wires.values.indexOf(v) === -1) {
        draft.wires.values.push(v);
        // Résolu si 3 fils correctement branchés.
        draft.wires.SOLVED = draft.wires.values.length === 3;
        if (draft.wires.SOLVED) {
          draft.bidule.SOLVED = true;
          SFX.biduleBuilt();
        } else {
          SFX.electricity();
        }
      }
      // Dès que deux prises ont été sélectionnées,
      // et que les vérifications ont été faites,
      // on peut désélectionner les deux prises.
      draft.wires.sockets.top = 0;
      draft.wires.sockets.bottom = 0;
    }
  }
}

export const wiresReducer = new ReducerWires();
