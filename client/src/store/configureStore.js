import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import RootReducer from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore (initialState) {
  return createStore(
    RootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware, // Enable us to dispatch functions.
      loggerMiddleware // Log all actions.
    )
  );
}