import { Howl } from 'howler';
import sndBackgroundMusic from './sounds/monstre_chambre.mp3';
import sndButtonWrong from './sounds/button_wrong.mp3';
import sndButtonClick from './sounds/button_click_1.mp3';
import sndButtonClick2 from './sounds/button_click_2.mp3';
import sndTool from './sounds/cliquet.mp3';
import sndOpenBidule from './sounds/ouverture_bidule.mp3';
import sndElectricity from './sounds/electricity.mp3';
import sndToggleSwitch from './sounds/toggle_switch.mp3';
import sndPopup from './sounds/popup.mp3';
import sndFan from './sounds/soufflerie.mp3';
import sndRocket from './sounds/sabre_laser.mp3';
import sndRadar from './sounds/radar.mp3';
import sndVisseuse from './sounds/visseuse.mp3';
import sndMachine from './sounds/machine.mp3';
import sndBoot from './sounds/boot.mp3';
import sndSparkle from './sounds/arc_electrique.mp3';
import sndKonami from './sounds/konami.mp3';
import sndError from './sounds/error.mp3';
import sndSuccess from './sounds/success.mp3';
import sndGaugeOK from './sounds/jauge_ok.mp3';
import sndNewEmail from './sounds/new_email.mp3';

class SoundManager {
  constructor() {
    this.sfxEnabled = false;
    this.sounds = {
      music: new Howl({
        src: sndBackgroundMusic,
        autoplay: false,
        loop: true,
        html5: true,
        mute: true,
        volume: 0.5,
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
        volume: 0.2,
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
      fan: new Howl({
        src: sndFan,
        autoplay: false,
        volume: 0.2,
      }),
      rocket: new Howl({
        src: sndRocket,
        autoplay: false,
        volume: 0.2,
      }),
      radar: new Howl({
        src: sndRadar,
        autoplay: false,
        volume: 0.2,
      }),
      visseuse: new Howl({
        src: sndVisseuse,
        autoplay: false,
        volume: 0.2,
      }),
      machine: new Howl({
        src: sndMachine,
        autoplay: false,
        volume: 0.2,
      }),
      boot: new Howl({
        src: sndBoot,
        autoplay: false,
        volume: 0.2,
      }),
      sparkle: new Howl({
        src: sndSparkle,
        autoplay: false,
        volume: 0.1,
      }),
      konami: new Howl({
        src: sndKonami,
        autoplay: false,
        volume: 0.4,
      }),
      error: new Howl({
        src: sndError,
        autoplay: false,
      }),
      success: new Howl({
        src: sndSuccess,
        autoplay: false,
        volume: 0.3,
      }),
      gaugeOK: new Howl({
        src: sndGaugeOK,
        autoplay: false,
        volume: 0.7,
      }),
      newEmail: new Howl({
        src: sndNewEmail,
        autoplay: false,
        volume: 0.5,
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

  stopAll() {
    for (name in this.sounds) {
      this.sounds[name].stop();
    }
  }
}

const soundManager = new SoundManager();
export default soundManager;

export const SFX = {
  play: s => soundManager.play(s),
  stop: s => soundManager.stop(s),
  stopAll: () => soundManager.stopAll(),
  enableSFX: b => soundManager.enableSFX(b),

  click: (n = '') => soundManager.play(`click${n}`),
  wrong: () => soundManager.play('wrong'),

  error: () => soundManager.play('error'),
  success: () => soundManager.play('success'),

  electricity: () => soundManager.play('electricity'),
  popup: () => soundManager.play('popup'),
  music: (on = true) => {
    if (on) {
      soundManager.play('music');
    } else {
      soundManager.stop('music');
    }
  },
};
