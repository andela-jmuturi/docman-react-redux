import {Map, fromJS} from 'immutable';

import * as actionTypes from '../constants';

const INITIAL_USER_DETAILS_STATE = Map({
  isFetching: false,
  isShowingUpdate: false,
  user: null,
  updatedUser: Map(),
  fetchError: null,
  validations: Map({
    isValid: false
  })
});

export default function (state = INITIAL_USER_DETAILS_STATE, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_DETAILS_REQUEST:
      return state.merge(Map({
        isFetching: true
      }));

    case actionTypes.FETCH_USER_DETAILS_SUCCESS:
      return state.merge(Map({
        isFetching: false,
        user: fromJS(action.user),
        updatedUser: fromJS(action.user)
      }));

    case actionTypes.FETCH_USER_DETAILS_ERROR:
      if (actionTypes.authError) {
        return state.merge(INITIAL_USER_DETAILS_STATE);
      }
      return state.merge({
        isFetching: false,
        fetchError: fromJS(action.error)
      });

    case actionTypes.USER_DETAILS_UPDATE_REQUEST:
      return state.merge(Map({
        isFetching: true,
        updatedUser: fromJS(action.updatedUser)
      }));

    case actionTypes.USER_DETAILS_UPDATE_SUCCESS:
      return state.merge(Map({
        isFetching: false,
        isShowingUpdate: false,
        updatedUser: fromJS(action.user),
        user: fromJS(action.user)
      }));

    case actionTypes.USER_DETAILS_UPDATE_FAILURE:
      return state.merge(Map({
        isFetching: false,
        userUpdateError: fromJS(action.error)
      }));

    case actionTypes.LOGOUT_REQUEST:
      return state.merge(INITIAL_USER_DETAILS_STATE);

    case actionTypes.TOGGLE_SHOW_USER_UPDATE_VIEW:
      return state.merge(Map({
        isShowingUpdate: !state.get('isShowingUpdate')
      }));

    case actionTypes.USER_DETAILS_FIELD_UPDATE:
      return state.merge(Map({
        updatedUser: fromJS(action.updatedUser)
      }));

    default:
      return state;
  }
}
