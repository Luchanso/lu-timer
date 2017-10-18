import { createStore, combineReducers } from 'redux';
import { uiTheme } from './uiTheme';

const reducers = combineReducers({
  uiTheme,
});

/* eslint-disable no-underscore-dangle */
export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
