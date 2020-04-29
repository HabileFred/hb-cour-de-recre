import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import FuseRight from './img/fusible_carre_juste.svg';
import FuseWrong from './img/fusible_carre_faux.svg';
import FuseOff from './img/fusible_carre_off.svg';

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

const ms = async delay => new Promise(resolve => setTimeout(resolve, delay));

const MachineFuses = function({ dispatch, fuses, focused, solved }) {
  let timer;

  const [feedback, setFeedback] = useState([0, 0, 0, 0]);

  const feedbackAnimation = async () => {
    window.clearTimeout(timer);
    dispatch({ type: 'FUSES_FEEDBACK_ANIMATION_STARTED' });
    setFeedback([0, 0, 0, 0]);
    await ms(700);

    for (let i = 0; i < 4; i++) {
      setFeedback([
        i >= 0 ? (fuses.feedback.values[0] ? 1 : -1) : 0,
        i >= 1 ? (fuses.feedback.values[1] ? 1 : -1) : 0,
        i >= 2 ? (fuses.feedback.values[2] ? 1 : -1) : 0,
        i >= 3 ? (fuses.feedback.values[3] ? 1 : -1) : 0,
      ]);
      await ms(330);
    }

    dispatch({ type: 'FUSES_FEEDBACK_ANIMATION_STOPPED' });
  };

  // Start animation when requested.
  useEffect(() => {
    console.log(fuses.feedback.status);
    if (fuses.feedback.status === 'shouldAnimate') {
      feedbackAnimation();
    }
  }, [fuses.feedback.status]);

  // Clear timeout when component is unmounted.
  useEffect(() => window.clearTimeout(timer), []);

  return (
    <MachineFusesContainer className={classnames({ focused, solved })}>
      {feedback.map((v, i) => {
        if (v === 1) return <FuseRight key={i} />;
        if (v === -1) return <FuseWrong key={i} />;
        return <FuseOff key={i} />;
      })}
    </MachineFusesContainer>
  );
};

export default withFocus(MachineFuses);
