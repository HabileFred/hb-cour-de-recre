import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;
  margin-bottom: -8px;
`;

import Socket1 from './img/bouton_cables_1_off.svg';
import Socket2 from './img/bouton_cables_2_off.svg';
import Socket3 from './img/bouton_cables_3_off.svg';
import Socket4 from './img/bouton_cables_4_off.svg';
import Socket5 from './img/bouton_cables_5_off.svg';

function Socket({ value }) {
  switch (value) {
    case 1:
      return (<Socket1 />);
    case 2:
      return (<Socket2 />);
    case 3:
      return (<Socket3 />);
    case 4:
      return (<Socket4 />);
    case 5:
      return (<Socket5 />);
    default:
      return null;
  }
}


function Button({ onClick, value, selected, ...props }) {
  return (
    <Wrapper type="button" onClick={onClick} {...props} className={classnames({ selected })}>
      <Socket value={value} />
    </Wrapper>
  );
}

export default Button;
