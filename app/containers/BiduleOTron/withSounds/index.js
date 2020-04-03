/**
 *
 * WithSounds
 *
 */

import React from 'react';
import { Howl, Howler } from 'howler';

function withSounds(WrappedComponent) {
  const sounds = {};

  const registerSound = (name, srcFile, options) => {
    sounds[name] = new Howl({
      src: [srcFile],
      ...options,
    });
  }

  const playSound = (name, volume) => {
    if (sounds[name]) {
      if (volume !== undefined) {
        sounds[name].volume(volume);
      }
      sounds[name].play();
    }
  };

  return class extends React.Component {
    render() {
      return <WrappedComponent playSound={playSound} registerSound={registerSound} {...this.props} />;
    }
  }
}

withSounds.propTypes = {};

export default withSounds;
