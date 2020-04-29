
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Icon from './icone_message.svg';
import { makeSelectMailboxHasUnread } from 'BOT/selectors';

const animation = keyframes`
from {
  transform: scale(1);
}
25% {
  transform: scale(1.2);
}
50 {
  transform: scale(1);
}
`;

const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
  z-index: 10;
  opacity: 0.5;
  transition: opacity 250ms ease;

  &.animated {
    animation: ${animation} 1s ease-out infinite;
    opacity: 1;
  }
`;

function MailNotification({ hasUnreadMessage }) {
  return (
    <Wrapper className={hasUnreadMessage ? 'animated' : ''}>
      <Icon />
    </Wrapper>
  )
}


const mapStateToProps = createStructuredSelector({
  hasUnreadMessage: makeSelectMailboxHasUnread(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MailNotification);
