
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import D0 from 'BOT/img/digits/0.svg';
import D1 from 'BOT/img/digits/1.svg';
import D2 from 'BOT/img/digits/2.svg';
import D3 from 'BOT/img/digits/3.svg';
import D4 from 'BOT/img/digits/4.svg';
import D5 from 'BOT/img/digits/5.svg';
import D6 from 'BOT/img/digits/6.svg';
import D7 from 'BOT/img/digits/7.svg';
import D8 from 'BOT/img/digits/8.svg';
import D9 from 'BOT/img/digits/9.svg';
import DP from 'BOT/img/digits/point.svg';

const DigitWrapper = styled.div`
  path {
    fill: ${props => props.color || 'black'};
  }
`;

export const Digit = function(props) {
  switch (String(props.d)) {
    case '0':
      return (<DigitWrapper {...props}><D0/></DigitWrapper>);
    case '1':
      return (<DigitWrapper {...props}><D1/></DigitWrapper>);
    case '2':
      return (<DigitWrapper {...props}><D2/></DigitWrapper>);
    case '3':
      return (<DigitWrapper {...props}><D3/></DigitWrapper>);
    case '4':
      return (<DigitWrapper {...props}><D4/></DigitWrapper>);
    case '5':
      return (<DigitWrapper {...props}><D5/></DigitWrapper>);
    case '6':
      return (<DigitWrapper {...props}><D6/></DigitWrapper>);
    case '7':
      return (<DigitWrapper {...props}><D7/></DigitWrapper>);
    case '8':
      return (<DigitWrapper {...props}><D8/></DigitWrapper>);
    case '9':
      return (<DigitWrapper {...props}><D9/></DigitWrapper>);
    case '.':
      return (<DigitWrapper {...props}><DP/></DigitWrapper>);
    default:
      return null;
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

export const Digits = function({ value, style }) {
  return (
    <Wrapper style={style}>
      {String(value).split('').map((d, i) => <Digit d={d} />)}
    </Wrapper>
  );
};
