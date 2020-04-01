import React from 'react';
import styled from 'styled-components';

import withFocus from '../../withFocus';

import imgFrame from './img/cadre_bidule.png';
import imgArrowLeft from './img/fleche_gauche.png';
import imgArrowRight from './img/fleche_droite.png';
import imgBtnSubmit from './img/bouton_valider.png';
import imgBtnCancel from './img/bouton_annuler.png';

import imgBidule1 from './img/bidule-1.png';
import imgBidule2 from './img/bidule-2.png';
import imgBidule3 from './img/bidule-3.png';
import imgBidule4 from './img/bidule-4.png';
import imgBidule5 from './img/bidule-5.png';

import imgBiduleInfos1 from './img/protocol-1.png';
import imgBiduleInfos2 from './img/protocol-2.png';
import imgBiduleInfos3 from './img/protocol-3.png';
import imgBiduleInfos4 from './img/protocol-4.png';
import imgBiduleInfos5 from './img/protocol-5.png';

const imgBiduleInfos = [
  imgBiduleInfos1,
  imgBiduleInfos2,
  imgBiduleInfos3,
  imgBiduleInfos4,
  imgBiduleInfos5,
];

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
      left: 197px;
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

  .bidule-info-text {
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 130%;
    transform: skew(1deg, 2deg);

    code {
      letter-spacing: 0.2em;
      font: Courier New, Menlo, sans-serif;
      display: block;
    }
  }

  .bidule-info-img {
    flex-shrink: 0;
  }

  .bidule-view {
    position: relative;
    //margin-left: 15px;
    width: 166px;
    height: 167px;
    overflow: hidden;
    flex-shrink: 0;

    .bidules {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-flow: row no-wrap;
      transition: left 250ms ease-out;
    }
  }

  .bidule-view.bidule-0 .bidules {
    left: 0;
  }
  .bidule-view.bidule-1 .bidules {
    left: -${166}px;
  }
  .bidule-view.bidule-2 .bidules {
    left: -${166 * 2}px;
  }
  .bidule-view.bidule-3 .bidules {
    left: -${166 * 3}px;
  }
  .bidule-view.bidule-4 .bidules {
    left: -${166 * 4}px;
  }
`;

const MachineBiduleSelector = function({ bidule, focused }) {
  const biduleInfos = bidule.biduleInfos[bidule.index];
  return (
    <MachineBiduleContainer className={`${focused ? 'focused' : ''}`}>
      <div className="ui-element frame"></div>
      <div className="ui-element arrow left"></div>
      <div className="ui-element arrow right"></div>
      <div className="bidule-info-text">
        <div>Nom de code :</div>
        <code>{biduleInfos.text1}</code>
        <code>{biduleInfos.text2}</code>
      </div>
      <div className={`bidule-view bidule-${bidule.index}`}>
        <div className="bidules">
          <img src={imgBidule1} />
          <img src={imgBidule2} />
          <img src={imgBidule3} />
          <img src={imgBidule4} />
          <img src={imgBidule5} />
        </div>
      </div>
      <div className="ui-element buttons">
        <img src={imgBtnSubmit} />
        <img src={imgBtnCancel} />
      </div>
      <div className="bidule-info-img">
        <img src={imgBiduleInfos[bidule.index]} />
      </div>
    </MachineBiduleContainer>
  );
}


export default withFocus(MachineBiduleSelector);
