import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectSounds, makeSelectStatus } from '../../selectors';

import imgOff from './img/bouton_son_off.png';
import imgMusicOn from './img/bouton_son_ambiance_on.png';
import imgSfxOn from './img/bouton_son_bruitage_on.png';

import {
  musicToggle,
  sfxToggle,
  computerOnOff,
  confirm,
} from '../../actions';

const ButtonGroupWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 46px);
  grid-gap: 15px;
  grid-auto-rows: 36px;
  position: absolute;
  bottom: 146px;
  left: 300px;
`;

const ButtonMusic = styled.button`
  border: none;
  outline: none;
  background: center center no-repeat url('${props => props.on ? imgMusicOn : imgOff}');
`;
const ButtonSFX = styled.button`
  border: none;
  outline: none;
  background: center center no-repeat url('${props => props.on ? imgSfxOn : imgOff}');
`;
const ButtonOnOff = styled.button`
  border: none;
  outline: none;
  padding: 2px;
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
      <ButtonOnOff type="button" onClick={confirmOnOff}>{status === 'on' ? 'OFF' : 'ON'}</ButtonOnOff>
      <ButtonSFX title="Activer les super effets sonores gratuits" type="button" onClick={() => dispatch(sfxToggle())} on={sounds.sfx} />
      <ButtonMusic title="Activer la super musique d'ambiance d'Anthony" type="button" onClick={() => dispatch(musicToggle())} on={sounds.music} />
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
