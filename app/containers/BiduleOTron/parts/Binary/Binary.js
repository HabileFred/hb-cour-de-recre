import React from 'react';
import styled from 'styled-components';
import withFocus from '../../withFocus';

const MachineBinaryContainer = styled.div`
  position: absolute;
  top: 101px;
  left: 606px;
  width: 100px;
  height: 160px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const MachineBinary = function({ binary, focused }) {
  return (
    <MachineBinaryContainer className={`${focused ? 'focused' : ''}`}>
    </MachineBinaryContainer>
  );
};

export default withFocus(MachineBinary);