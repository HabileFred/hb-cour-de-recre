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

function importButtonImages() {
  const r = require.context('./img/', false, /bouton_.+\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_([1-5])_/)[1];
    const s = key.match(/_(on|off)\.png/)[1];
    if (!images[l]) {
      images[l] = [];
    }
    images[l][s === 'on' ? 1 : 0] = r(key);
  });
  return images;
}
const images = importButtonImages();

function importWireImages() {
  const r = require.context('./img/', false, /cable_reponse_.+\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const l = key.match(/_(\d\d)\.png/)[1];
    images[l] = r(key);
  });
  return images;
}
const wireImages = importWireImages();

import imgFocus from './img/focus.png';

const Wrapper = styled.section`
  position: absolute;
  display: flex;
  flex-flow: column;
  bottom: 102px;
  left: 441px;
  height: 60px;

  &::before {
    pointer-events: none;
    content: "";
    position: absolute;
    width: 181px;
    height: 80px;
    left: 0px;
    top: 0px;
    opacity: ${props => props.focused ? 1 : 0};
    transition: opacity 250ms ease;
    background: top left no-repeat url('${imgFocus}');
  }
`;

const Line1 = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 23px);
  grid-gap: 6px;
  grid-auto-rows: 16px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Line2 = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 23px);
  grid-gap: 6px;
  grid-auto-rows: 16px;
  position: absolute;
  top: 44px;
  left: 34px;
`;

const wireDefinitions = {
  '11': { x: 25, y: -20, w: 28, h: 68 },
  '24': { x: 50, y: -19, w: 92, h: 68 },
  '32': { x: 65, y: -10, w: 34, h: 60 },
};
const Wire = styled.div`
  position: absolute;
  left: ${props => wireDefinitions[props.wireId].x}px;
  top: ${props => wireDefinitions[props.wireId].y}px;
  width: ${props => wireDefinitions[props.wireId].w}px;
  height: ${props => wireDefinitions[props.wireId].h}px;
  background: center center no-repeat url('${props => wireImages[props.wireId]}');
  pointer-events: none;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background: center center no-repeat url('${props => images[String(props.value)][props.selected ? 1 : 0]}');
`;

/**
 *
 */
function ButtonGroupWires({ dispatch, wires, focused }) {
  return (
    <Wrapper focused={focused}>
      <Line1>
        <Button type="button" value={1} selected={wires.sockets.top === 1} onClick={() => dispatch(wireSelectTopSocket(1))} />
        <Button type="button" value={2} selected={wires.sockets.top === 2} onClick={() => dispatch(wireSelectTopSocket(2))} />
        <Button type="button" value={3} selected={wires.sockets.top === 3} onClick={() => dispatch(wireSelectTopSocket(3))} />
        <Button type="button" value={4} selected={wires.sockets.top === 4} onClick={() => dispatch(wireSelectTopSocket(4))} />
        <Button type="button" value={5} selected={wires.sockets.top === 5} onClick={() => dispatch(wireSelectTopSocket(5))} />
      </Line1>
      <Line2>
        <Button type="button" value={1} selected={wires.sockets.bottom === 1} onClick={() => dispatch(wireSelectBottomSocket(1))} />
        <Button type="button" value={2} selected={wires.sockets.bottom === 2} onClick={() => dispatch(wireSelectBottomSocket(2))} />
        <Button type="button" value={3} selected={wires.sockets.bottom === 3} onClick={() => dispatch(wireSelectBottomSocket(3))} />
        <Button type="button" value={4} selected={wires.sockets.bottom === 4} onClick={() => dispatch(wireSelectBottomSocket(4))} />
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
