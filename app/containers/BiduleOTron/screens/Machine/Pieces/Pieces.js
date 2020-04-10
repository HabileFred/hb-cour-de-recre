import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

function importPiecesImages() {
  const r = require.context('./img/', false, /piece_\d+\.png$/);
  const images = new Array(r.keys().length + 1);
  r.keys().forEach(key => {
    const l = key.match(/_(\d+)\.png$/)[1];
    images[l] = r(key);
  });
  return images;
}
const imgPieces = importPiecesImages();

import imgPieceFocus from './img/piece_focus.png';

import imgMachinePiecesFocus from './img/machine_focus.png';
import imgMachineArrows from './img/piece_fleches.png';

const piecesY = [36, 91, 146, 201, 256];
export const Piece = styled.div`
  position: absolute;
  width: 54px;
  height: 56px;
  background: transparent no-repeat center center url(${props => imgPieces[props.value]});
  left: 54px;
  top: ${props => piecesY[props.index]}px;
`;

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

  &.solved {
    opacity: 1;
  }
`;

const Cursor = styled.div`
  position: absolute;
  background: transparent no-repeat center center url(${imgPieceFocus});
  width: 56px;
  height: 57px;
  z-index: 0;
  left: 54px;
  top: ${props => 36 + props.position * 55}px;
  transition: opacity 250ms ease;
  opacity: ${props => props.active ? 1 : 0};
}
`;

const MachinePieces = function({ pieces, focused, solved }) {
  return (
    <MachinePiecesContainer className={classnames({ focused, solved })}>
      <Cursor active={!solved && focused} position={pieces.cursor} />
      {pieces.current.map((v, i) => (
        <Piece key={`p${i}`} value={v} index={i} />
      ))}
      <div className="arrows"></div>
    </MachinePiecesContainer>
  );
}

export default withFocus(MachinePieces);