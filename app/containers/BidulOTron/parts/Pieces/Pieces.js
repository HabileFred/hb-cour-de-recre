import React from 'react';
import styled from 'styled-components';

import imgPiece0 from './img/piece_vide.png';
import imgPiece1 from './img/piece_1.png';
import imgPiece2 from './img/piece_2.png';
import imgPiece3 from './img/piece_3.png';
import imgPiece4 from './img/piece_4.png';
import imgPiece5 from './img/piece_5.png';
import imgPieceFocus from './img/piece_focus.png';

import imgMachinePiecesFocus from './img/machine_focus.png';
import imgMachineArrows from './img/piece_fleches.png';

export const Piece = styled.div`
  position: absolute;
  width: 54px;
  height: 56px;
  background: transparent no-repeat center center;

  &.piece-0 {
    top: 36px;
    left: 54px;
  }
  &.piece-1 {
    top: 91px;
    left: 54px;
  }
  &.piece-2 {
    top: 147px;
    left: 54px;
  }
  &.piece-3 {
    top: 201px;
    left: 54px;
  }
  &.piece-4 {
    top: 257px;
    left: 54px;
  }

  &.piece-value-0 {
    background-image: url(${imgPiece0});
  }
  &.piece-value-1 {
    background-image: url(${imgPiece1});
  }
  &.piece-value-2 {
    background-image: url(${imgPiece2});
  }
  &.piece-value-3 {
    background-image: url(${imgPiece3});
  }
  &.piece-value-4 {
    background-image: url(${imgPiece4});
  }
  &.piece-value-5 {
    background-image: url(${imgPiece5});
  }

  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    background: transparent no-repeat center center url(${imgPieceFocus});
    width: 56px;
    height: 57px;
    display: none;
    z-index: -1;
  }

  &.active::before {
    display: block;
  }
`;

const MachinePiecesContainer = styled.div`
  position: absolute;
  top: 210px;
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
    background: transparent no-repeat center center url(${imgMachineArrows});
    transform: scale(0);
  }

  &.focused {
    background: url(${imgMachinePiecesFocus}) no-repeat top left;
    opacity: 1;

    .arrows {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const MachinePieces = function({ pad, pieces }) {
  return (
    <MachinePiecesContainer className={`${pad.focus === 'pieces' ? 'focused' : null}`}>
      <div className="arrows"></div>
      {pieces.current.map((v, i) => (
        <Piece key={`p${i}`} className={`piece-${i} piece-value-${v} ${pieces.cursor === i ? 'active' : ''}`} />
      ))}
    </MachinePiecesContainer>
  );
}
