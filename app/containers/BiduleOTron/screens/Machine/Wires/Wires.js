import React from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import ImageWire11 from './img/cable_11.svg';
import ImageWire24 from './img/cable_24.svg';
import ImageWire32 from './img/cable_32.svg';

import imgFocusTop from './img/focus_branchement_haut.png';
import imgFocusBottom from './img/focus_branchement_bas.png';

const dash = keyframes`
to {
  stroke-dashoffset: 100;
}
`;

const MachineWiresContainer = styled.div`
  position: absolute;
  top: 184px;
  left: 773px;
  width: 154px;
  height: 44px;

  svg.wire {
    position: absolute;
    top: 1px;
    left: 6px;
  }
`;

function Wire({ wireId }) {
  switch (wireId) {
    case '11':
      return (<ImageWire11 className="wire wire-11" />);
    case '24':
      return (<ImageWire24 className="wire wire-24" />);
    case '32':
      return (<ImageWire32 className="wire wire-32" />);
    default:
      return null;
  }
}

const MachineWires = function({ wires, focused, solved }) {
  return (
    <MachineWiresContainer className={classnames({ focused, solved })}>
      {wires.values.map((wireId, i) => (
        <Wire key={wireId} wireId={wireId} />
      ))}
    </MachineWiresContainer>
  );
};

export default withFocus(MachineWires);