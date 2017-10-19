import { createAction, handleActions } from 'redux-actions';

const DEFAULT_STATE = false;

export const toggle = createAction('settingsMode/Toggle');

const handleToggle = (state, action) => {
  if (typeof action.payload === 'boolean') {
    return action.payload;
  }

  return !state;
};

const settingsMode = handleActions(
  {
    [toggle]: handleToggle,
  },
  DEFAULT_STATE,
);

export default settingsMode;
