import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the BidulOTron state domain
 */

const selectBidulOTronDomain = state => state.bidulOTron || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BidulOTron
 */

const makeSelectBidulOTron = () =>
  createSelector(
    selectBidulOTronDomain,
    substate => substate,
  );

export default makeSelectBidulOTron;
export { selectBidulOTronDomain };
