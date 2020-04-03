
import sndBackgroundMusic from './sounds/monstre_chambre.mp3';
import sndButtonWrong from './sounds/button_wrong.mp3';
import sndButtonClick from './sounds/button_click.mp3';
import sndButtonClick2 from './sounds/button_click_2.mp3';
import sndTool from './sounds/cliquet.mp3';
import sndOpenBidule from './sounds/ouverture_bidule.mp3';
import sndElectricity from './sounds/electricity.mp3';

class SoundManager {
  constructor() {
    this.sfxEnabled = true;
    this.sounds = {
      music: new Howl({
        src: sndBackgroundMusic,
        autoplay: false,
        loop: true,
        html5: true,
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
      }),
      biduleBuilt: new Howl({
        src: sndOpenBidule,
        autoplay: false,
      }),
      electricity: new Howl({
        src: sndElectricity,
        autoplay: false,
      }),
    };
  }

  enableSFX(enabled) {
    this.sfxEnabled = enabled;
  }

  play(name) {
    if (name === 'music' || (this.sfxEnabled && name in this.sounds)) {
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
  music: (on = true) => {
    if (on) {
      soundManager.play('music');
    } else {
      soundManager.stop('music');
    }
  }
};
