
import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import StartupImage from './chargement.svg';
import ProgressItem from './progress_item.svg';
import { focusNext } from '../../actions';

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: wait;

  .contents {
    position: absolute;
    top: 25%;
    left: 50%;
    width: 158px;
    height: 156px;
    transform: translateX(-50%);

    .progress-bar {
      position: absolute;
      top: 113px;
      left: 19px;
      width: 120px;
      height: 20px;
      display: grid;
      grid-template-columns: repeat(12, 8px);
      grid-gap: 2px;
    }
  }
`;


function useProgressBar() {
  const [progress, setProgress] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  let timer;

  useEffect(() => {
    function doProgress() {
      if (progress < 12) {
        setProgress(progress + 1);
      } else {
        setFinished(true);
      }
    }

    window.clearTimeout(timer);
    if (!finished) {
      timer = window.setTimeout(doProgress, 70 + Math.random() * 400);
    }

    return () => window.clearTimeout(timer);
  }, [progress, finished]);

  return [progress, finished];
}


function Loading({ dispatch }) {

  const [progress, finished] = useProgressBar();

  useEffect(() => {
    if (finished) {
      dispatch(focusNext());
    }
  }, [finished]);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Wrapper>
      <div className="contents">
        <StartupImage style={{ position: 'absolute', top: 0, left: 0 }} />
        <div className="progress-bar">
          {items.map(i => <ProgressItem style={{ display: i <= progress ? 'block' : 'none'}} key={i} />)}
        </div>
      </div>
    </Wrapper>
  );
}

Loading.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(Loading);
