import { createSelector } from 'reselect';
import { initialState } from './reducers/initialState';

/**
 * Direct selector to the BiduleOTron state domain
 */

const selectBiduleOTronDomain = state => state.biduleOTron || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BiduleOTron
 */

export const makeSelectBiduleOTron = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate,
  );

export const makeSelectWires = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.wires,
  );

export const makeSelectPipes = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.pipes,
  );

export const makeSelectLights = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.lights,
  );

export const makeSelectPieces = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.pieces,
  );

export const makeSelectFuses = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.fuses,
  );

export const makeSelectSimon = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.simon,
  );

export const makeSelectBinary = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.binary,
  );

export const makeSelectBidule = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.bidule,
  );

export const makeSelectSounds = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.sounds,
  );

export const makeSelectLogin = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.login,
  );

export const makeSelectHome = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.home,
  );

export const makeSelectNav = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.nav,
  );

export const makeSelectControlPanelFocus = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.nav.controlPanel.focus,
  );

export const makeSelectRadar = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.radar,
  );

export const makeSelectParams = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.params,
  );

export const makeSelectGame = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.$game,
  );
export const makeSelectStatus = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.status,
  );
export const makeSelectError = () =>
  createSelector(
    selectBiduleOTronDomain,
    substate => substate.error,
  );
