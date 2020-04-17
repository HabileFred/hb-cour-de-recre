
import React from 'react';

import Bidule01 from './bidules/bidule_01.svg';
import Bidule02 from './bidules/bidule_02.svg';
import Bidule03 from './bidules/bidule_03.svg';
import Bidule04 from './bidules/bidule_04.svg';
import Bidule05 from './bidules/bidule_05.svg';
import Bidule06 from './bidules/bidule_06.svg';
import Bidule07 from './bidules/bidule_07.svg';
import Bidule07Porthole from './bidules/bidule_07_hublot.svg';
import Bidule08 from './bidules/bidule_08.svg';
import Bidule09 from './bidules/bidule_09.svg';
import Bidule10 from './bidules/bidule_10.svg';
import Bidule11 from './bidules/bidule_11.svg';
import Bidule12 from './bidules/bidule_12.svg';
import Bidule13 from './bidules/bidule_13.svg';
import Bidule14 from './bidules/bidule_14.svg';
import Bidule15 from './bidules/bidule_15.svg';

const Bidule = function({ b, inPorthole, ...props }) {
  switch (b) {
    case 1:
      return (<Bidule01 {...props}/>);
    case 2:
      return (<Bidule02 {...props}/>);
    case 3:
      return (<Bidule03 {...props}/>);
    case 4:
      return (<Bidule04 {...props}/>);
    case 5:
      return (<Bidule05 {...props}/>);
    case 6:
      return (<Bidule06 {...props}/>);
    case 7:
      return (inPorthole
        ? (<Bidule07Porthole {...props} />)
        : (<Bidule07 {...props}/>)
        );
    case 8:
      return (<Bidule08 {...props}/>);
    case 9:
      return (<Bidule09 {...props}/>);
    case 10:
      return (<Bidule10 {...props}/>);
    case 11:
      return (<Bidule11 {...props}/>);
    case 12:
      return (<Bidule12 {...props}/>);
    case 13:
      return (<Bidule13 {...props}/>);
    case 14:
      return (<Bidule14 {...props}/>);
    case 15:
      return (<Bidule15 {...props}/>);
    default:
      return null;
  }
}

export default Bidule;