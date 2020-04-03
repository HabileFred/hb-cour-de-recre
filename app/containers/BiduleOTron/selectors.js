import { createSelector } from 'reselect';
import { initialState } from './reducer';

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

const makeSelectBiduleOTron = () =>
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

export default makeSelectBiduleOTron;
