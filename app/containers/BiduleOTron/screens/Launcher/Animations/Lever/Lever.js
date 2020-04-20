import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import theme from 'BOT/Theme';

import ImageLever from './levier_envoi.svg';

const Wrapper = styled.div`
  position: absolute;
  left: 247px;
  top: 279px;
  width: 100px;
  height: 87px;
  z-index: 0;

  &.active path.levier_envoi_svg__fill-color {
    fill: ${theme.focus.color};
  }

  path.levier_envoi_svg__lever {
    transition: transform 500ms ease-out;
    transform-origin: 93px 77px;
  }

  &.on path.levier_envoi_svg__lever {
    transform: rotate(-110deg);
  }
`;

export default function Lever({ active, on }) {
  return (
    <Wrapper className={classnames({ active, on })}>
      <ImageLever />
    </Wrapper>
  );
}
