import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import withFocus from 'BOT/withFocus';

import ImageFrame from './img/selection_bidule.svg';
import ImageSubmit from './img/valider.svg';
import ImageCancel from './img/annuler.svg';

import ImageLeftArrow from './img/fleche_bidule.svg'
import ImageRightArrow from './img/fleche_droite_bidule.svg'

import Bidule from 'BOT/components/Bidules/Bidules';
import BiduleCode from 'BOT/components/Bidules/Codes';
import BiduleProtocol from 'BOT/components/Bidules/Protocols';

const MachineBiduleContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 85px;
  width: 230px;
  display: flex;
  flex-flow: column;
  align-items: center;
  z-index: 1;

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
    top: 60px;
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
    top: 128px;

    &.left {
      left: -10px;
    }
    &.right {
      transform: rotate(10deg);
      left: 197px;
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
    margin-top: 0;
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
  width: 166px;
  height: 167px;
  overflow: hidden;
  flex-shrink: 0;

  .bidules {
    position: absolute;
    top: 0;
    left: ${props => -props.index * 166}px;
    display: flex;
    flex-flow: row no-wrap;
    transition: left 250ms ease-in-out;
  }
`;

const MachineBidule = function({ bidule, focused, solved }) {
  const biduleName = bidule.biduleNames[bidule.index];
  return (
    <MachineBiduleContainer className={classnames({ focused, solved })}>
      <ImageFrame className="frame" />
      <ImageLeftArrow className="ui-element arrow left"/>
      <ImageRightArrow className="ui-element arrow right"/>

      <BiduleCode name={biduleName} />
      <BidulesView index={bidule.index}>
        <div className="bidules">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(b => (<Bidule key={b} b={b} />))}
        </div>
      </BidulesView>
      <div className="ui-element buttons">
        <ImageSubmit />
        <ImageCancel />
      </div>
      <div className="bidule-info-img">
        {bidule.submitted
        ? (<BiduleProtocol p={bidule.index} />)
        : null
        }
      </div>
    </MachineBiduleContainer>
  );
}


export default withFocus(MachineBidule);
