
import React from 'react';

import Protocol1 from './protocols/protocol_1.svg';
import Protocol2 from './protocols/protocol_2.svg';
import Protocol3 from './protocols/protocol_3.svg';
import Protocol4 from './protocols/protocol_4.svg';
import Protocol5 from './protocols/protocol_5.svg';
import Protocol6 from './protocols/protocol_6.svg';
import Protocol7 from './protocols/protocol_7_solution.svg';
import Protocol8 from './protocols/protocol_8.svg';

const Protocol = function(props) {
  switch (props.p) {
    case 0:
    case 8:
      return (<Protocol1/>);
    case 1:
    case 9:
      return (<Protocol2/>);
    case 2:
    case 10:
      return (<Protocol3/>);
    case 3:
    case 11:
      return (<Protocol4/>);
    case 4:
    case 12:
      return (<Protocol5/>);
    case 5:
    case 13:
      return (<Protocol6/>);
    case 6:
      return (<Protocol7/>);
    case 7:
    case 14:
      return (<Protocol8/>);
    default:
      return null;
  }
}

export default Protocol;
