import React from 'react';
import styled from 'styled-components';

import imgFrame from './img/cadre_bidule.png';
import imgArrow from './img/fleche_bidule.png';
import imgBtnSubmit from './img/bouton_valider.png';
import imgBtnCancel from './img/bouton_annuler.png';

import imgBidule1 from './img/bidule-1.png';
import imgBidule2 from './img/bidule-2.png';
import imgBidule3 from './img/bidule-3.png';
import imgBidule4 from './img/bidule-4.png';
import imgBidule5 from './img/bidule-5.png';

import imgBiduleInfos1 from './img/bidule-infos-1.png';
import imgBiduleInfos2 from './img/bidule-infos-2.png';
import imgBiduleInfos3 from './img/bidule-infos-3.png';
import imgBiduleInfos4 from './img/bidule-infos-4.png';
import imgBiduleInfos5 from './img/bidule-infos-5.png';

const imgBiduleInfos = [
  imgBiduleInfos1,
  imgBiduleInfos2,
  imgBiduleInfos3,
  imgBiduleInfos4,
  imgBiduleInfos5,
];

const MachineBiduleContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 100px;
  opacity: 0.5;
  transition: opacity 250ms ease;
  display: flex;
  flex-flow: column;

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
    left: 0px;
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
    background: url(${imgArrow}) no-repeat top left;
    width: 42px;
    height: 46px;
    left: -30px;
    top: 118px;

    &.right {
      transform: rotate(180deg);
      left: 180px;
      }
  }

  .buttons,
  .bidule-info-text,
  .bidule-info-img {
    width: 195px;
  }

  .buttons {
    width: 185px;
    display: flex;
    flew-flow: row no-wrap;
    justify-content: center;
  }

  .bidule-info-text {
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 130%;

    code {
      letter-spacing: 0.2em;
      font: Courier New, Menlo, sans-serif;
      display: block;
    }
  }

  .bidule-info-img {
  }

  .bidule-view {
    position: relative;
    margin-left: 15px;
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

  &.focused {
    opacity: 1;
  }
`;

export const MachineBiduleSelector = function({ bidule, pad }) {
  const biduleInfos = bidule.biduleInfos[bidule.index];
  return (
    <MachineBiduleContainer className={`${pad.focus === 'bidule' ? 'focused' : null}`}>
      <div className="frame"></div>
      <div className="arrow left"></div>
      <div className="arrow right"></div>
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
      <div className="buttons">
        <img src={imgBtnSubmit} />
        <img src={imgBtnCancel} />
      </div>
      <img className="bidule-info-img" src={imgBiduleInfos[bidule.index]} />
    </MachineBiduleContainer>
  );
}
