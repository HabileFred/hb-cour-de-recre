import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import ImageArrows from './img/fleches.svg';
import Piece from 'BOT/components/Pieces/Pieces';
import theme from 'BOT/theme';

const MachinePiecesContainer = styled.div`
  position: absolute;
  top: 169px;
  left: 434px;
  width: 160px;
  height: 338px;
  opacity: 0.5;
  transition: opacity 250ms ease;

  .arrows {
    position: absolute;
    width: 160px;
    height: 338px;
    opacity: 0;
    transition: opacity 250ms ease, transform 250ms ease;
  }

  &.focused {
    opacity: 1;
    .arrows {
      opacity: 1;
      transform: scale(1);
    }
  }

  &.solved {
    opacity: 1;
  }

  .piece {
    position: absolute;
    width: 54px;
    height: 56px;
    left: 54px;

    &.piece-0 {
      top: 36px;
    }
    &.piece-1 {
      top: 91px;
    }
    &.piece-2 {
      top: 146px;
    }
    &.piece-3 {
      top: 201px;
    }
    &.piece-4 {
      top: 256px;
    }
  }

  &.focused.selected-piece-0 .piece-0 path[class$="focus-piece"],
  &.focused.selected-piece-1 .piece-1 path[class$="focus-piece"],
  &.focused.selected-piece-2 .piece-2 path[class$="focus-piece"],
  &.focused.selected-piece-3 .piece-3 path[class$="focus-piece"],
  &.focused.selected-piece-4 .piece-4 path[class$="focus-piece"] {
    fill: ${theme.focus.color};
    stroke: ${theme.focus.color};
    stroke-width: ${theme.focus.strokeWidth};
  }
`;

const MachinePieces = function({ pieces, focused, solved }) {
  const cls = { focused, solved };
  cls[`selected-piece-${pieces.cursor}`] = true;
  return (
    <MachinePiecesContainer className={classnames(cls)}>
      {pieces.current.map((v, i) => (
        <Piece key={`p${i}`} p={v} className={`piece piece-${i}`} />
      ))}
      <ImageArrows className="arrows"/>
    </MachinePiecesContainer>
  );
}

export default withFocus(MachinePieces);