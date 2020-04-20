import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectSounds, makeSelectStatus } from '../../selectors';

import {
  musicToggle,
  sfxToggle,
  computerOnOff,
  confirm,
} from '../../actions';

import Button from './Button';

const ButtonGroupWrapper = styled.section`
  display: grid;
  grid-template-columns: 60px 43px 43px;
  grid-gap: 10px;
  grid-auto-rows: 36px;
  position: absolute;
  bottom: 144px;
  left: 236px;
`;

/**
 *
 */
function ButtonGroupSounds({ dispatch, sounds, status }) {

  const onOffCallback = () => {
    setImmediate(() => dispatch(computerOnOff()));
  }

  function confirmOnOff() {
    if (status === 'on') {
      dispatch(confirm('confirm-off', onOffCallback));
    } else {
      dispatch(computerOnOff());
    }
  }

  return (
    <ButtonGroupWrapper>
      <Button
        style={{ marginTop: '3px' }}
        action="onOff"
        title={status === 'on' ? 'Éteindre la machine' : 'Allumer la machine'}
        onClick={confirmOnOff} pushed={status === 'on'}
      />
      <Button
        action="sfx"
        title="Activer les super effets sonores gratuits"
        onClick={() => dispatch(sfxToggle())} pushed={sounds.sfx}
      />
      <Button
        action="music"
        title="Activer la super musique d'ambiance d'Anthony"
        onClick={() => dispatch(musicToggle())} pushed={sounds.music}
      />
    </ButtonGroupWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  sounds: makeSelectSounds(),
  status: makeSelectStatus(),
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

export default compose(withConnect)(ButtonGroupSounds);
