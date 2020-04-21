import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectSounds, makeSelectStatus } from 'BOT/selectors';
import theme from 'BOT/Theme';

import {
  musicToggle,
  sfxToggle,
  computerOnOff,
  confirm,
} from '../../actions';

import Button from './Button';
import ImagePower from './img/allumer.svg';

const ButtonGroupWrapper = styled.section`
  display: grid;
  grid-template-columns: 60px 43px 43px;
  grid-gap: 10px;
  grid-auto-rows: 36px;
  position: absolute;
  bottom: 144px;
  left: 236px;
`;

const PowerIcon = styled.div`
  position: absolute;
  top: 10px;
  left: -22px;

  &.off path {
    fill: darkred;
  }
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
      <PowerIcon className={status}>
        <ImagePower />
      </PowerIcon>
      <Button
        style={{ marginTop: '3px' }}
        action="onOff"
        title={status === 'on' ? 'Éteindre la machine' : 'Allumer la machine'}
        onClick={confirmOnOff} pushed={status === 'on'}
      />
      <Button
        action="sfx"
        disabled={status === 'off'}
        title="Activer les super effets sonores gratuits"
        onClick={() => dispatch(sfxToggle())} pushed={status === 'on' && sounds.sfx}
      />
      <Button
        action="music"
        disabled={status === 'off'}
        title="Activer la super musique d'ambiance d'Anthony"
        onClick={() => dispatch(musicToggle())} pushed={status === 'on' && sounds.music}
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
