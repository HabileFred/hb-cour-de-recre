
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

function importDigitsImages() {
  const r = require.context('./img/digits/', false, /\d\.png$/);
  const images = new Array(10);
  r.keys().forEach(key => {
    const l = parseInt(key.match(/\d\.png$/), 10);
    images[l] = r(key);
  });
  return images;
}
const digitImages = importDigitsImages();

export const Digit = styled.div`
  width: 33px;
  height: 38px;
  background: center center no-repeat url('${props => digitImages[props.digit]}');
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

export const Digits = function({ value, style }) {
  return (<Wrapper style={style}>{String(value).split('').map((c,i) => <Digit key={i} digit={c} />)}</Wrapper>);
};
