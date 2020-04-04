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

const Line1 = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 23px);
  grid-gap: 6px;
  grid-auto-rows: 16px;
  position: absolute;
  bottom: 124px;
  left: 460px;
`;

const Line2 = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 23px);
  grid-gap: 6px;
  grid-auto-rows: 16px;
  position: absolute;
  bottom: 100px;
  left: 474px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background: center center no-repeat url('${props => images[String(props.value)][props.selected ? 1 : 0]}');
`;

/**
 *
 */
function ButtonGroupWires({ dispatch, wires }) {
  return (
    <React.Fragment>
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
    </React.Fragment>
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
