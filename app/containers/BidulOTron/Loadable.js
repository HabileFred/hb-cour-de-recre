/**
 *
 * Asynchronously loads the component for BidulOTron
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
