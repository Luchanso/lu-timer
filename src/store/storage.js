import { createAction } from 'redux-actions';

const STORAGE_KEY = 'appState';

export const record = createAction('storage/RECORD');
export const save = createAction('storage/SAVE');
export const load = createAction('storage/LOAD');

let recordActive = false;

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

  if (action.type === record.toString()) {
    recordActive = true;
  }

  const result = next(state, action);

  if (recordActive) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  }

  return result;
};
