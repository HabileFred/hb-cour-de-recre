/**
 *
 * WithSounds
 *
 */

import React from 'react';
import { Howl, Howler } from 'howler';

function withSounds(WrappedComponent) {
  const sounds = {};

  const registerSound = (name, srcFile) => {
    sounds[name] = new Howl({ src: [srcFile] });
  }

  const playSound = (name) => {
    if (sounds[name]) {
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
