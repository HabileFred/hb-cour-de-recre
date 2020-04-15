
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

import { makeSelectHome } from 'BOT/selectors';
import theme from 'BOT/Theme';

import Background from './img/menu.svg';
import ImageMenuItem1 from './img/menu_selection_bidulo.svg';
import ImageMenuItem2 from './img/menu_selection_lance.svg';

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
`;

function Home({ home }) {
  return (
    <Wrapper>
      <Background style={{ position: 'absolute', top: 0, left: 0 }} />
      <div className={classnames('menu-item', 'menu-item-1', { active: home.cursor === 0 })}>
        <ImageMenuItem1 />
      </div>
      <div className={classnames('menu-item', 'menu-item-2', { active: home.cursor === 1 })}>
        <ImageMenuItem2 />
      </div>
    </Wrapper>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
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
