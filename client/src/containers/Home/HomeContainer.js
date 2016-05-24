import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';

/* eslint-disable no-unused-vars */
import Home from '../../components/Home/Home.jsx';
import UnauthenticatedHomeContainer from '../Auth/UnauthenticatedHomeContainer';
/* eslint-enable no-unused-vars */

import {logoutUser} from '../../actions/AuthActions';
import {loadUserDetails} from '../../actions/UserDetailsActions';

class HomeContainer extends React.Component {
  constructor (props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.updateUserDetailsIfNeeded = this.updateUserDetailsIfNeeded.bind(this);
  }

  componentDidMount () {
    this.updateUserDetailsIfNeeded(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.updateUserDetailsIfNeeded(nextProps);
  }

  updateUserDetailsIfNeeded (props) {
    // Fetch user details if we're authenticated and have no user details.
    // This happens when the user is coming back to the application and is
    // using a cached token.
    if (props.auth.get('isAuthenticated') && (!props.userDetails.get('user') &&
        !props.userDetails.get('isFetching'))) {
      this.props.dispatch(loadUserDetails());
    }
  }

  handleLogout (event) {
    this.props.dispatch(logoutUser());
  }

  render () {
    return this.props.auth.get('isAuthenticated')
      ? <Home onLogout={this.handleLogout}
          userDetails={this.props.userDetails.toJS()}
        />
      : <UnauthenticatedHomeContainer />;
  }
}

HomeContainer.propTypes = {
  auth: function (props, propName, componentName) {
    if (!props[propName] instanceof Map) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}.` +
        'Expected `Immutable.Map`'
      );
    }
  },
  dispatch: PropTypes.func.isRequired,
  userDetails: function (props, propName, componentName) {
    if (!props[propName] instanceof Map) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}.` +
        'Expected `Immutable.Map`'
      );
    }
  }
};

function mapStateToProps (state) {
  const {dispatch} = state;
  const auth = state.get('auth');
  const userDetails = state.get('userDetails');
  return {
    dispatch,
    auth,
    userDetails
  };
};

export default connect(mapStateToProps)(HomeContainer);
