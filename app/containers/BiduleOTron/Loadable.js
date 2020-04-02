/**
 *
 * Asynchronously loads the component for BiduleOTron
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
