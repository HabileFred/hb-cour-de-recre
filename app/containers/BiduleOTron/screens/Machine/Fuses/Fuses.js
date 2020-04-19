import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import FuseRight from './img/fusible_carre_juste.svg';
import FuseWrong from './img/fusible_carre_faux.svg';

const MachineFusesContainer = styled.div`
  position: absolute;
  top: 124px;
  left: 750px;
  width: 176px;
  height: 68px;
  display: flex;
  flex-flow: row;
  align-items: center;
  opacity: 0;
  transition: opacity 250ms ease;
  padding-left: 17px;
  z-index: 1;

  &.focused {
    opacity: 1;
  }

  &.solved {
    opacity: 1;
  }
`;

const MachineFuses = function({ fuses, focused, solved }) {
  return (
    <MachineFusesContainer className={classnames({ focused, solved })}>
      {fuses.feedback.map((on, i) => on ? <FuseRight key={i} /> : <FuseWrong key={i} />)}
    </MachineFusesContainer>
  );
};

export default withFocus(MachineFuses);