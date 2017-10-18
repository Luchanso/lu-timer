import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { uiTheme } from './uiTheme';
import { storageMiddlewareReducer } from './storage';

const rootReducer = combineReducers({
  uiTheme,
});
const reducers = compose(storageMiddlewareReducer)(rootReducer);

const enhancer = compose(
  applyMiddleware(thunk),
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
);

export default createStore(
  reducers,
  enhancer,
);
