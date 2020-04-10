
import { Howl } from 'howler';
import sndBackgroundMusic from './sounds/monstre_chambre.mp3';
import sndButtonWrong from './sounds/button_wrong.mp3';
import sndButtonClick from './sounds/button_click.mp3';
import sndButtonClick2 from './sounds/button_click_2.mp3';
import sndTool from './sounds/cliquet.mp3';
import sndOpenBidule from './sounds/ouverture_bidule.mp3';
import sndElectricity from './sounds/electricity.mp3';
import sndToggleSwitch from './sounds/toggle_switch.mp3';
import sndPopup from './sounds/popup.mp3';

class SoundManager {
  constructor() {
    this.sfxEnabled = true;
    this.sounds = {
      music: new Howl({
        src: sndBackgroundMusic,
        autoplay: false,
        loop: true,
        html5: true,
        mute: true,
      }),
      wrong: new Howl({
        src: sndButtonWrong,
        autoplay: false,
      }),
      click: new Howl({
        src: sndButtonClick,
        autoplay: false,
      }),
      click2: new Howl({
        src: sndButtonClick2,
        autoplay: false,
      }),
      tool: new Howl({
        src: sndTool,
        autoplay: false,
        volume: 0.3,
      }),
      biduleBuilt: new Howl({
        src: sndOpenBidule,
        autoplay: false,
      }),
      electricity: new Howl({
        src: sndElectricity,
        autoplay: false,
        volume: 0.4,
      }),
      toggleSwitch: new Howl({
        src: sndToggleSwitch,
        autoplay: false,
      }),
      popup: new Howl({
        src: sndPopup,
        autoplay: false,
        volume: 0.2,
      }),
    };
  }

  enableSFX(enabled) {
    this.sfxEnabled = enabled;
  }

  play(name) {
    if (name === 'music' || (this.sfxEnabled && name in this.sounds)) {
      this.sounds[name].mute(false);
      this.sounds[name].play();
    }
  }

  stop(name) {
    if (name in this.sounds) {
      this.sounds[name].stop();
    }
  }
}

const soundManager = new SoundManager();
export default soundManager;

export const SFX = {
  enableSFX: (b) => soundManager.enableSFX(b),
  click: (n = '') => soundManager.play(`click${n}`),
  wrong: () => soundManager.play('wrong'),
  tool: () => soundManager.play('tool'),
  biduleBuilt: () => soundManager.play('biduleBuilt'),
  electricity: () => soundManager.play('electricity'),
  toggleSwitch: () => soundManager.play('toggleSwitch'),
  popup: () => soundManager.play('popup'),
  music: (on = true) => {
    if (on) {
      soundManager.play('music');
    } else {
      soundManager.stop('music');
    }
  }
};
