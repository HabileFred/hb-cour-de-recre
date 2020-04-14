import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background: none;

  .off {
    display: block;
  }
  .on {
    display: none;
  }

  &.pushed {
    .off {
      display: none;
    }
    .on {
      display: block;
    }
  }

  .button-sfx {
    path[class$=button-fill-color] { fill: ${props => props.theme.buttonSFX}; }
  }
  .button-music {
    path[class$=button-fill-color] { fill: ${props => props.theme.buttonMusic}; }
  }
`;

Wrapper.defaultProps = {
  theme: {
    buttonSFX: "#17c0eb",
    buttonMusic: "#18dcff",
  }
};

import SVGImageOff from './img/bouton_son_off.svg';
import SVGImageOn from './img/bouton_son_on.svg';
import SVGMachineOn from './img/bouton_machine_on.svg';
import SVGMachineOff from './img/bouton_machine_off.svg';

function Button({ onClick, action, pushed }) {
  if (action === 'onOff') {
    return (
        <Wrapper type="button" onClick={onClick} className={classnames({ pushed })}>
          <SVGMachineOff className={`off`}/>
          <SVGMachineOn className={`on`}/>
        </Wrapper>
    );
  }
  return (
      <Wrapper type="button" onClick={onClick} className={classnames({ pushed })}>
        <SVGImageOff className={`off button-${action}`}/>
        <SVGImageOn className={`on button-${action}`}/>
      </Wrapper>
  );
}

export default Button;
