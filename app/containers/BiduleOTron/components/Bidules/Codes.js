
import React from 'react';

import AnnuleParoles from './codes/annule_parole.svg';
import AntiBug from './codes/anti_bug.svg';
import AspiFaussesIdees from './codes/aspi_fausse_idee.svg';
import AspiTruc from './codes/aspi_truc_solution.svg';
import AttrapeEternuements from './codes/attrape_eternuement.svg';
import Encodeur from './codes/encodeur.svg';
import Geolocalisateur from './codes/geolocalisateur.svg';
import RamasseClou from './codes/ramasse_clou.svg';
import RamasseVide from './codes/ramasse_vide.svg';
import Recepteur from './codes/recepteur.svg';
import Solution from './codes/solution.svg';
import SouffleRien from './codes/souffle_rien.svg';
import Temporel from './codes/temporel.svg';
import Transmetteur from './codes/transmetteur.svg';
import Parasite from './codes/parasite.svg';

const Code = function(props) {
  switch (String(props.name)) {
    case 'annule_paroles':
      return (<AnnuleParoles/>);
    case 'anti_bug':
      return (<AntiBug/>);
    case 'aspi_fausses_idees':
      return (<AspiFaussesIdees/>);
    case 'aspi_truc':
      return (<AspiTruc/>);
    case 'attrape_eternuements':
      return (<AttrapeEternuements/>);
    case 'encodeur':
      return (<Encodeur/>);
    case 'geolocalisateur':
      return (<Geolocalisateur/>);
    case 'ramasse_clou':
      return (<RamasseClou/>);
    case 'ramasse_vide':
      return (<RamasseVide/>);
    case 'recepteur':
      return (<Recepteur/>);
    case 'solution':
      return (<Solution/>);
    case 'souffle_rien':
      return (<SouffleRien/>);
    case 'temporel':
      return (<Temporel/>);
    case 'parasite':
      return (<Parasite/>);
    case 'transmetteur':
      return (<Transmetteur/>);
    default:
      return null;
  }
}

export default Code;
