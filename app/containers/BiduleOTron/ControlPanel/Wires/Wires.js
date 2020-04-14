import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectWires } from '../../selectors';

import {
  wireSelectTopSocket,
  wireSelectBottomSocket,
} from '../../actions';


import ImgWire11 from './img/cable_11.svg';
import ImgWire24 from './img/cable_24.svg';
import ImgWire32 from './img/cable_32.svg';

const Wrapper = styled.section`
  position: absolute;
  display: flex;
  flex-flow: column;
  bottom: 108px;
  left: 441px;
  height: 60px;
`;

const Line1 = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 23px);
  grid-gap: 6px;
  grid-auto-rows: 16px;
  position: absolute;
  top: 20px;
  left: 22px;
`;

const Line2 = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 23px);
  grid-gap: 7px;
  grid-auto-rows: 16px;
  position: absolute;
  top: 44px;
  left: 35px;
`;

const wireDefinitions = {
  '11': { x: 25, y: -14, w: 28, h: 68 },
  '24': { x: 52, y: -13, w: 92, h: 68 },
  '32': { x: 66, y: -4, w: 34, h: 60 },
};

const WireWrapper = styled.div`
  position: absolute;
  left: ${props => wireDefinitions[props.wireId].x}px;
  top: ${props => wireDefinitions[props.wireId].y}px;
  width: ${props => wireDefinitions[props.wireId].w}px;
  height: ${props => wireDefinitions[props.wireId].h}px;
  pointer-events: none;
`;

function Wire(props) {
  let wire = null;
  switch (props.wireId) {
    case '11':
      wire = <ImgWire11 />;
      break;
    case '24':
      wire = <ImgWire24 />;
      break;
    case '32':
      wire = <ImgWire32 />;
      break;
  }
  return (
    <WireWrapper {...props}>{wire}</WireWrapper>
  )
}

import Button from './Button';

/**
 *
 */
function ButtonGroupWires({ dispatch, wires, focused }) {
  return (
    <Wrapper focused={focused}>
      <Line1>
        <Button value={1} selected={wires.sockets.top === 1} onClick={() => dispatch(wireSelectTopSocket(1))} />
        <Button value={2} selected={wires.sockets.top === 2} onClick={() => dispatch(wireSelectTopSocket(2))} />
        <Button value={3} selected={wires.sockets.top === 3} onClick={() => dispatch(wireSelectTopSocket(3))} />
        <Button value={4} selected={wires.sockets.top === 4} onClick={() => dispatch(wireSelectTopSocket(4))} />
        <Button value={5} selected={wires.sockets.top === 5} onClick={() => dispatch(wireSelectTopSocket(5))} />
      </Line1>
      <Line2>
        <Button value={1} selected={wires.sockets.bottom === 1} onClick={() => dispatch(wireSelectBottomSocket(1))} />
        <Button value={2} selected={wires.sockets.bottom === 2} onClick={() => dispatch(wireSelectBottomSocket(2))} />
        <Button value={3} selected={wires.sockets.bottom === 3} onClick={() => dispatch(wireSelectBottomSocket(3))} />
        <Button value={4} selected={wires.sockets.bottom === 4} onClick={() => dispatch(wireSelectBottomSocket(4))} />
      </Line2>
      {wires.values.map((v) => <Wire key={v} wireId={v} />)}
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  wires: makeSelectWires(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ButtonGroupWires);
