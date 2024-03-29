/**
 *
 * WithFocus
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectBiduleOTron } from '../selectors';

function withFocus(WrappedComponent) {
  return class extends React.Component {
    render() {
      const focused = this.props.store ? this.props.store.nav.focus.indexOf(this.props.focusId) !== -1 : false;
      const solved = this.props.store && this.props.store[this.props.focusId] ? this.props.store[this.props.focusId].SOLVED : false;
      return <WrappedComponent solved={solved} focused={focused} {...this.props} />;
    }
  }
}

withFocus.propTypes = {};

const mapStateToProps = createStructuredSelector({
  store: makeSelectBiduleOTron(),
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

export default compose(withConnect, withFocus);
