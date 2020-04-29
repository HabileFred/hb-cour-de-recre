
import React from 'react';
import styled, { keyframes } from 'styled-components';

import PopupBackground from './fond_popup.svg';

const popupAnimation = keyframes`
  from {
    transform: translateX(-50%) translateY(-50%) scale(.5);
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
`;

const confirmAnimation = keyframes`
  from {
    transform: translateX(-50%) translateY(-50%) scale(.5);
    opacity: 0;
  }
  90% {
    transform: translateX(-50%) translateY(-50%) scale(1.15);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
`;

const PopupWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 530px;
  z-index: 100;
  cursor: not-allowed;

  .popup-contents {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: ${popupAnimation} 330ms ease;
  }
`;

const ConfirmWrapper = styled(PopupWrapper)`
  .popup-contents {
    animation: ${confirmAnimation} 330ms ease;
  }
`;

const absolute = {
  position: 'absolute',
  top: 0,
  left: 0,
};

export function Popup({ children }) {
  return (
    <PopupWrapper>
      <PopupBackground style={absolute}/>
      <div className="popup-contents">
        {children}
      </div>
    </PopupWrapper>
  );
}

export function Confirm({ children }) {
  return (
    <ConfirmWrapper style={absolute}>
      <PopupBackground style={absolute}/>
      <div className="popup-contents">
        {children}
      </div>
    </ConfirmWrapper>
  );
}
