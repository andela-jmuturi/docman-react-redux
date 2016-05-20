import { Map, fromJS } from 'immutable';

import * as actionTypes from '../constants';

export default function (state = Map({
  isAuthenticated: !!localStorage.getItem('token'),
  isFetching: false,
  credentials: Map({
    username: '',
    email: '',
    password: ''
  }),
  error: null,
  user: null,
  isShowingLogin: true
}), action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
      return state.merge(Map({
        isFetching: true,
        credentials: fromJS(action.credentials)
      }));

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
      return state.merge(Map({
        isAuthenticated: true,
        isFetching: false,
        credentials: Map({
          username: '',
          email: '',
          password: ''
        }),
        error: null,
        user: fromJS(action.user)
      }));

    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
      return state.merge(Map({
        isAuthenticated: false,
        isFetching: false,
        error: fromJS(action.error),
        user: null
      }));

    case actionTypes.CREDENTIALS_UPDATE:
      return state.merge(Map({
        credentials: fromJS(action.credentials)
      }));

    case actionTypes.TOGGLE_LOGIN_VIEW:
      return state.merge(Map({
        isShowingLogin: !state.get('isShowingLogin'),
        error: null
      }));

    default:
      return state;
  }
}
