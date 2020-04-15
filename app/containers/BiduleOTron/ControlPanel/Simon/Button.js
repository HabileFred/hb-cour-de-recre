import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;

  .default {
    display: block;
  }
  .active {
    display: none;
  }

  &:active {
    .default {
      display: none;
    }
    .active {
      display: block;
    }
  }

  .color-red {
    path[class$=fill-color]   { fill: ${props => props.theme.redLight}; }
  }

  .color-pink {
    path[class$=fill-color]   { fill: ${props => props.theme.pinkLight}; }
  }

  .color-purple {
    path[class$=fill-color]   { fill: ${props => props.theme.purpleLight}; }
  }

  .color-orange {
    path[class$=fill-color]   { fill: ${props => props.theme.orangeLight}; }
  }

  .color-yellow {
    path[class$=fill-color]   { fill: ${props => props.theme.yellowLight}; }
  }

  .color-blue {
    path[class$=fill-color]   { fill: ${props => props.theme.electricBlueLight}; }
  }

  .color-green {
    path[class$=fill-color]   { fill: ${props => props.theme.greenLight}; }
  }

  .color-gray {
    path[class$=fill-color]   { fill: ${props => props.theme.grayLight}; }
  }
`;

Wrapper.defaultProps = {
  theme: {
    redLight: "#ff4d4d",
    electricBlueLight: "#7efff5",
    purpleLight: "#cd84f1",
    pinkLight: "#ffcccc",
    orangeLight: "#ffaf40",
    yellowLight: "#fffa65",
  }
};

import SVGImageDefault from './img/bouton.svg';
import SVGImageActive from './img/bouton_on.svg';

function Button({ onClick, color }) {
  return (
      <Wrapper type="button" onClick={onClick}>
        <SVGImageDefault className={`default color-${color}`}/>
        <SVGImageActive className={`active color-${color}`}/>
      </Wrapper>
  );
}

export default Button;
