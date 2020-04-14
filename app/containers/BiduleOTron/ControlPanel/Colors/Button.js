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
    path[class$=fill-color-top]   { fill: ${props => props.theme.red}; }
    path[class$=fill-color-front] { fill: ${props => props.theme.redLight}; }
  }

  .color-pink {
    path[class$=fill-color-top]   { fill: ${props => props.theme.pink}; }
    path[class$=fill-color-front] { fill: ${props => props.theme.pinkLight}; }
  }

  .color-purple {
    path[class$=fill-color-top]   { fill: ${props => props.theme.purple}; }
    path[class$=fill-color-front] { fill: ${props => props.theme.purpleLight}; }
  }

  .color-orange {
    path[class$=fill-color-top]   { fill: ${props => props.theme.orange}; }
    path[class$=fill-color-front] { fill: ${props => props.theme.orangeLight}; }
  }

  .color-blue {
    path[class$=fill-color-top]   { fill: ${props => props.theme.blue}; }
    path[class$=fill-color-front] { fill: ${props => props.theme.blueLight}; }
  }

  .color-green {
    path[class$=fill-color-top]   { fill: ${props => props.theme.green}; }
    path[class$=fill-color-front] { fill: ${props => props.theme.greenLight}; }
  }

  .color-gray {
    path[class$=fill-color-top]   { fill: ${props => props.theme.gray}; }
    path[class$=fill-color-front] { fill: ${props => props.theme.grayLight}; }
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
