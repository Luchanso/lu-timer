import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import uiTheme from './uiTheme';
import timers from './timers';
import settingsMode from './settingsMode';
import { storageMiddlewareReducer } from './storage';

const rootReducer = combineReducers({
  uiTheme,
  timers,
  settingsMode,
});

const reducers = compose(storageMiddlewareReducer)(rootReducer);
const enhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(
  reducers,
  enhancer,
);
