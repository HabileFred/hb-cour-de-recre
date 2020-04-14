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
    path[class$=fill-color]   { fill: ${props => props.theme.red}; }
  }

  .color-pink {
    path[class$=fill-color]   { fill: ${props => props.theme.pink}; }
  }

  .color-purple {
    path[class$=fill-color]   { fill: ${props => props.theme.purple}; }
  }

  .color-orange {
    path[class$=fill-color]   { fill: ${props => props.theme.orange}; }
  }

  .color-yellow {
    path[class$=fill-color]   { fill: ${props => props.theme.yellow}; }
  }

  .color-blue {
    path[class$=fill-color]   { fill: ${props => props.theme.blue}; }
  }

  .color-green {
    path[class$=fill-color]   { fill: ${props => props.theme.green}; }
  }

  .color-gray {
    path[class$=fill-color]   { fill: ${props => props.theme.gray}; }
  }
`;

Wrapper.defaultProps = {
  theme: {
    red: "#ff3838",
    redLight: "#ff4d4d",

    blue: "#17c0eb",
    blueLight: "#18dcff",

    purple: "#c56cf0",
    purpleLight: "#cd84f1",

    green: "#3ae374",
    greenLight: "#32ff7e",

    pink: "#ffb8b8",
    pinkLight: "#ffcccc",

    orange: "#ff9f1a",
    orangeLight: "#ffaf40",

    yellow: "#fff200",
    yellowLight: "#fffa65",

    gray: "#dddddd",
    grayLight: "#eeeeee",
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
