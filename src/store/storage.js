import { createAction } from 'redux-actions';

const STORAGE_KEY = 'appState';

export const save = createAction('storage/SAVE');
export const load = createAction('storage/LOAD');

export const storageMiddlewareReducer = next => (state, action) => {
  if (action.type === save.toString()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } else if (action.type === load.toString()) {
    const result = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return next(result, action);
  }

  return next(state, action);
};
