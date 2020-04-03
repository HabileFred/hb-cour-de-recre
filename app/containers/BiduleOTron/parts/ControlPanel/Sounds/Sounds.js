import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectSounds } from '../../../selectors';

import imgOff from './img/bouton_son_off.png';
import imgMusicOn from './img/bouton_son_ambiance_on.png';
import imgSfxOn from './img/bouton_son_bruitage_on.png';

import {
  musicToggle,
  sfxToggle,
} from '../../../actions';

const ButtonGroupWrapper = styled.section`
  display: grid;
  grid-template-columns: 46px 46px;
  grid-gap: 2px;
  grid-auto-rows: 36px;
  position: absolute;
  bottom: 146px;
  left: 349px;
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

/**
 *
 */
function ButtonGroupSounds({ dispatch, sounds }) {
  return (
    <ButtonGroupWrapper>
      <ButtonMusic title="Activer la super musique d'ambiance d'Anthony" type="button" onClick={() => dispatch(musicToggle())} on={sounds.music} />
      <ButtonSFX title="Activer les super effets sonores gratuits" type="button" onClick={() => dispatch(sfxToggle())} on={sounds.sfx} />
    </ButtonGroupWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  sounds: makeSelectSounds(),
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
