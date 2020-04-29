
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import { makeSelectHome } from 'BOT/selectors';
import theme from 'BOT/Theme';
import MailNotification from 'BOT/components/MailNotification/MailNotification';

import Background from './img/menu.svg';
import ImageMenuItem1 from './img/menu_selection_bidulo.svg';
import ImageMenuItem2 from './img/menu_selection_lance.svg';
import ImageSubmit from 'BOT/img/valider.svg';
import { musicToggle, homeFirstTime, mailboxAddMessage } from '../../actions';
import { makeSelectBidule } from '../../selectors';

const animation = keyframes`
  from {
    transform: scale(.95);
  }
  50% {
    transform: scale(1.10);
  }
  to {
    transform: scale(.95);
  }
`;

const Wrapper = styled.section`
  width: 100%;
  flex: 1;
  display: flex;
  flex-flow: row;

  .menu-item {
    position: absolute;
    top: 90px;
    transform: scale(.95);
    &.active {
      animation: ${animation} 1300ms ease-in-out infinite;
    }
  }

  .menu-item-1 {
    left: 80px;
  }
  .menu-item-2 {
    left: 365px;
  }

  .menu-item.active path[class$="fill-selected"] {
    stroke-width: ${theme.focus.strokeWidth};
    stroke: ${theme.focus.color};
    fill: ${theme.focus.color};
  }

  .btn-submit {
    position: absolute;
    top: 357px;
    opacity: 0;
    transition: opacity 250ms ease-in;
  }
  .btn-submit.active {
    opacity: 1;
  }

  .btn-submit-1 {
    left: 167px;
  }
  .btn-submit-2 {
    left: 452px;
  }
`;

function Home({ dispatch, bidule, home }) {

  useEffect(() => {
    dispatch(homeFirstTime());
    if (bidule.SOLVED) {
      window.setTimeout(() => dispatch(mailboxAddMessage('mail-destination')), 3000);
    } else {
      window.setTimeout(() => dispatch(mailboxAddMessage('mail-bidule')), 3000);
    }
  }, []);

  return (
    <Wrapper>
      <Background style={{ position: 'absolute', top: 0, left: 0 }} />
      <MailNotification />
      <div className={classnames('menu-item', 'menu-item-1', { active: home.cursor === 0 })}>
        <ImageMenuItem1 />
      </div>
      <div className={classnames('menu-item', 'menu-item-2', { active: home.cursor === 1 })}>
        <ImageMenuItem2 />
      </div>
      <div className={classnames('btn-submit', 'btn-submit-1', { active: home.cursor === 0 })}>
        <ImageSubmit />
      </div>
      <div className={classnames('btn-submit', 'btn-submit-2', { active: home.cursor === 1 })}>
        <ImageSubmit />
      </div>
    </Wrapper>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  bidule: makeSelectBidule(),
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

export default compose(withConnect)(Home);
