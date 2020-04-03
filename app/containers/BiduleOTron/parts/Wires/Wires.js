import React from 'react';
import styled from 'styled-components';
import withFocus from '../../withFocus';

import imgWire11 from './img/cable_11.png';
import imgWire24 from './img/cable_24.png';
import imgWire32 from './img/cable_32.png';

import imgFocusTop from './img/focus_branchement_haut.png';
import imgFocusBottom from './img/focus_branchement_bas.png';

const imgWires = {
  11: imgWire11,
  24: imgWire24,
  32: imgWire32
};

const MachineWiresContainer = styled.div`
  position: absolute;
  top: 184px;
  left: 773px;
  width: 154px;
  height: 44px;
`;

const Wire = styled.div`
  position: absolute;
  width: 154px;
  height: 44px;
  background: top left no-repeat url('${props => imgWires[props.wireId]}');
`;

const FocusConnector = styled.div`
  position: absolute;
  left: 0;
  width: 142px;
  height: 11px;
  opacity: ${props => props.ready ? 1 : 0};
  transition: opacity 250ms ease;
`;

const FocusConnectorTop = styled(FocusConnector)`
  top: 0;
  background: top left no-repeat url('${imgFocusTop}');
`;

const FocusConnectorBottom = styled(FocusConnector)`
  bottom: 0;
  background: top left no-repeat url('${imgFocusBottom}');
`;

const MachineWires = function({ wires, focused, solved }) {
  return (
    <MachineWiresContainer className={`${focused ? 'focused' : ''} ${solved ? 'solved' : ''}`}>
      <FocusConnectorTop ready={wires.readiness.top} />
      <FocusConnectorBottom ready={wires.readiness.bottom} />
      {wires.values.map((wireId, i) => (
        <Wire key={wireId} wireId={wireId} />
      ))}
    </MachineWiresContainer>
  );
};

export default withFocus(MachineWires);