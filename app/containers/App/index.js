/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BiduleOTron from 'containers/BiduleOTron/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={BiduleOTron} />
        <Route exact path="/bidule-o-tron/" component={BiduleOTron} />
        <Route component={NotFoundPage} />
      </Switch>
      <div id="cookies_message">
        En poursuivant votre navigation sur notre jeu, vous acceptez
        l'utilisation des cookies qui nous permettent de récolter des
        statistiques de visites.
        <button
          onClick={() =>
            (document.getElementById('cookies_message').style.display = 'none')
          }
        >
          OK
        </button>
      </div>
    </React.Fragment>
  );
}
