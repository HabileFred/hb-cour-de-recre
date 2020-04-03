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

export default makeSelectBiduleOTron;
export { selectBiduleOTronDomain };
