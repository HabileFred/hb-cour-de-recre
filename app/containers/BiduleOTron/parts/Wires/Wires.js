import React from 'react';
import styled from 'styled-components';
import withFocus from '../../withFocus';

import imgWire1 from './img/cable_1.png';
import imgWire2 from './img/cable_2.png';
import imgWire3 from './img/cable_3.png';

import imgFocusTop from './img/focus_branchement_haut.png';
import imgFocusBottom from './img/focus_branchement_bas.png';

const imgWires = [imgWire1, imgWire2, imgWire3];

const MachineWiresContainer = styled.div`
  position: absolute;
  top: 184px;
  left: 773px;
  width: 154px;
  height: 44px;
`;

const Wire = styled.div`
  width: 154px;
  height: 44px;
  background: top left no-repeat url('${props => imgWires[props.index]}');
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
    </MachineWiresContainer>
  );
};

export default withFocus(MachineWires);