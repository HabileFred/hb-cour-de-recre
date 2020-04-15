
import React from 'react';

import Piece01 from './img/piece_01.svg';
import Piece02 from './img/piece_02.svg';
import Piece03 from './img/piece_03.svg';
import Piece04 from './img/piece_04.svg';
import Piece05 from './img/piece_05.svg';
import Piece06 from './img/piece_06.svg';
import Piece07 from './img/piece_07.svg';
import Piece08 from './img/piece_08.svg';
import Piece09 from './img/piece_09.svg';
import Piece10 from './img/piece_10.svg';
import Piece11 from './img/piece_11.svg';
import Piece12 from './img/piece_12.svg';
import Piece13 from './img/piece_13.svg';
import Piece14 from './img/piece_14.svg';
import Piece15 from './img/piece_15.svg';
import Piece16 from './img/piece_16_solution.svg';
import Piece17 from './img/piece_17_solution.svg';
import Piece18 from './img/piece_18_solution.svg';
import Piece19 from './img/piece_19_solution.svg';
import Piece20 from './img/piece_20_solution.svg';
import PieceEmpty from './img/piece.svg';

/*
  Generator:
  let imports = [];
  let cases = [];
  for (let i = 1; i <= 20; i++) {
    const k = String(i).padStart(2, '0');
    imports.push(`import Piece${k} from './img/piece_${k}.svg';`);
    cases.push(`    case ${i}:
    return (<Piece${k} {...props}/>);
`);
  }
  console.log(imports.join("\n"));
  console.log(cases.join("\n"));
*/

const Piece = function({ p, ...props }) {
  switch (p) {
    case 1:
      return (<Piece01 {...props}/>);

    case 2:
      return (<Piece02 {...props}/>);

    case 3:
      return (<Piece03 {...props}/>);

    case 4:
      return (<Piece04 {...props}/>);

    case 5:
      return (<Piece05 {...props}/>);

    case 6:
      return (<Piece06 {...props}/>);

    case 7:
      return (<Piece07 {...props}/>);

    case 8:
      return (<Piece08 {...props}/>);

    case 9:
      return (<Piece09 {...props}/>);

    case 10:
      return (<Piece10 {...props}/>);

    case 11:
      return (<Piece11 {...props}/>);

    case 12:
      return (<Piece12 {...props}/>);

    case 13:
      return (<Piece13 {...props}/>);

    case 14:
      return (<Piece14 {...props}/>);

    case 15:
      return (<Piece15 {...props}/>);

    case 16:
      return (<Piece16 {...props}/>);

    case 17:
      return (<Piece17 {...props}/>);

    case 18:
      return (<Piece18 {...props}/>);

    case 19:
      return (<Piece19 {...props}/>);

    case 20:
      return (<Piece20 {...props}/>);

    default:
      return (<PieceEmpty {...props}/>);
  }
}

export default Piece;