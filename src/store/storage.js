import { createAction } from 'redux-actions';

const STORAGE_KEY = 'appState';

export const save = createAction('storage/SAVE');
export const load = createAction('storage/LOAD');

export const storageMiddlewareReducer = next => (state, action) => {
  if (action.type === save.toString()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } else if (action.type === load.toString()) {
    const rowData = localStorage.getItem(STORAGE_KEY);
    if (rowData) {
      const result = JSON.parse(rowData);
      return next(result, action);
    }
  }

  const result = next(state, action);

  if (action.type !== '@@INIT') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  }

  return result;
};
