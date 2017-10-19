import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { componseWithDevtools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { uiTheme } from './uiTheme';
import { storageMiddlewareReducer } from './storage';

const rootReducer = combineReducers({
  uiTheme,
});

const reducers = compose(storageMiddlewareReducer)(rootReducer);
const enhancer = componseWithDevtools(applyMiddleware(thunk));

export default createStore(
  reducers,
  enhancer,
);
