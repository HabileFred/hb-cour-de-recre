
import React from 'react';
import styled from 'styled-components';

import D0 from './0.svg';
import D1 from './1.svg';
import D2 from './2.svg';
import D3 from './3.svg';
import D4 from './4.svg';
import D5 from './5.svg';
import D6 from './6.svg';
import D7 from './7.svg';
import D8 from './8.svg';
import D9 from './9.svg';
import DP from './point.svg';

const DigitWrapper = styled.div`
  path {
    fill: ${props => props.color || 'black'};
  }
`;

export const Digit = function({d, size, margin, ...props}) {
  const style = { width: `${size || 18}px`, margin: `0 ${margin || 0}` };
  switch (String(d)) {
    case '0':
      return (<DigitWrapper style={style} {...props}><D0/></DigitWrapper>);
    case '1':
      return (<DigitWrapper style={style} {...props}><D1/></DigitWrapper>);
    case '2':
      return (<DigitWrapper style={style} {...props}><D2/></DigitWrapper>);
    case '3':
      return (<DigitWrapper style={style} {...props}><D3/></DigitWrapper>);
    case '4':
      return (<DigitWrapper style={style} {...props}><D4/></DigitWrapper>);
    case '5':
      return (<DigitWrapper style={style} {...props}><D5/></DigitWrapper>);
    case '6':
      return (<DigitWrapper style={style} {...props}><D6/></DigitWrapper>);
    case '7':
      return (<DigitWrapper style={style} {...props}><D7/></DigitWrapper>);
    case '8':
      return (<DigitWrapper style={style} {...props}><D8/></DigitWrapper>);
    case '9':
      return (<DigitWrapper style={style} {...props}><D9/></DigitWrapper>);
    case '.':
    case '*':
      return (<DigitWrapper style={style} {...props}><DP/></DigitWrapper>);
    default:
      return null;
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

export const Digits = function({ value, size, margins, ...props }) {
  return (
    <Wrapper {...props}>
      {String(value).split('').map((d, i) => <Digit margin={margins} size={size} key={i} d={d} />)}
    </Wrapper>
  );
};
