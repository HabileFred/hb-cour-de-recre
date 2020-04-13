import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import imgFrame from './img/cadre_bidule.png';
import imgArrowLeft from './img/fleche_gauche.png';
import imgArrowRight from './img/fleche_droite.png';
import imgBtnSubmit from './img/bouton_valider.png';
import imgBtnCancel from './img/bouton_annuler.png';

function importBiduleImages() {
  const r = require.context('./img/bidules/', false, /bidule_\d+\.png$/);
  const images = new Array(r.keys().length + 1);
  r.keys().forEach(key => {
    const l = key.match(/_(\d+)\.png$/)[1];
    images[l] = r(key);
  });
  return images;
}
const biduleImages = importBiduleImages();

function importCodesImages() {
  const r = require.context('./img/codes/', false, /\.png$/);
  const images = {};
  r.keys().forEach(key => {
    const name = key.match(/\.\/([^.]+)\.png$/)[1];
    images[name] = r(key);
  });
  return images;
}
const codeImages = importCodesImages();

function importProtocolImages() {
  const r = require.context('./img/protocoles/', false, /protocole_\d+\.png$/);
  const images = new Array(r.keys().length);
  r.keys().forEach(key => {
    const l = key.match(/_(\d+)\.png$/)[1];
    images[l - 1] = r(key);
  });
  return images;
}
const protocoleImages = importProtocolImages();
// On réutilise les mêmes images plusieurs fois s'il y a moins de protocoles que de bidules.
let i = 0;
while (protocoleImages.length < biduleImages.length) {
  protocoleImages.push(protocoleImages[i]);
  i += 1;
}

const MachineBiduleContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 85px;
  width: 230px;
  display: flex;
  flex-flow: column;
  align-items: center;

  @keyframes grow {
    from {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.9);
    }
    to {
      transform: scale(1.1);
    }
  }

  .frame {
    position: absolute;
    left: 17px;
    top: 50px;
    background: url(${imgFrame}) no-repeat top left;
    width: 195px;
    height: 190px;
  }

  &.focused .frame {
    animation-name: grow;
    animation-duration: 1300ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .arrow {
    position: absolute;
    width: 42px;
    height: 46px;
    top: 118px;

    &.left {
      left: -12px;
      background: url(${imgArrowLeft}) no-repeat top left;
    }
    &.right {
      left: 195px;
      background: url(${imgArrowRight}) no-repeat top left;
    }
  }

  .ui-element {
    opacity: 0;
    transform: scale(0);
    transition: opacity 250ms ease, transform 250ms ease;
  }
  &.focused .ui-element {
    opacity: 1;
    transform: scale(1);
  }

  .buttons {
    margin-top: -10px;
    display: flex;
    flew-flow: row no-wrap;
    justify-content: center;
  }

  .bidule-info-img {
    flex-shrink: 0;
  }
`;

const BidulesView = styled.div`
  position: relative;
  width: 167px;
  height: 166px;
  overflow: hidden;
  flex-shrink: 0;

  .bidules {
    position: absolute;
    top: 0;
    left: ${props => -props.index * 167}px;
    display: flex;
    flex-flow: row no-wrap;
    transition: left 250ms ease-out;
  }
`;

const BiduleCodeName = styled.div`
  width: 122px;
  height: 58px;
  background: top left no-repeat url('${props => codeImages[props.name]}');
`;

const MachineBidule = function({ bidule, focused, solved }) {
  const biduleName = bidule.biduleNames[bidule.index];
  return (
    <MachineBiduleContainer className={classnames({ focused, solved })}>
      <div className="frame"></div>
      <div className="ui-element arrow left"></div>
      <div className="ui-element arrow right"></div>
      <BiduleCodeName name={biduleName} />
      <BidulesView index={bidule.index}>
        <div className="bidules">
          {biduleImages.map((img, i) => <img key={i} src={img} />)}
        </div>
      </BidulesView>
      <div className="ui-element buttons">
        <img src={imgBtnSubmit} />
        <img src={imgBtnCancel} />
      </div>
      <div className="bidule-info-img">
        {bidule.submitted
        ? (<img src={protocoleImages[bidule.index]} />)
        : null
        }
      </div>
    </MachineBiduleContainer>
  );
}


export default withFocus(MachineBidule);
