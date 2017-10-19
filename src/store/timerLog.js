import { handleActions } from 'redux-actions';
import { stop, start } from './timers';

const DEFAULT_STATE = {};

const handleStart = (state, action) => {
  const id = action.payload;
  const timer = state[id] || {
    id,
    actions: [],
  };

  const lastAction = timer.actions[timer.actions.length - 1];

  if (lastAction && lastAction.start) {
    return state;
  }

  return {
    ...state,
    [id]: {
      ...timer,
      actions: [
        ...timer.actions,
        {
          start: Date.now(),
        },
      ],
    },
  };
};

const handleStop = (state, action) => {
  const id = action.payload;
  const timer = state[id] || {
    id,
    actions: [],
  };

  const lastAction = timer.actions[timer.actions.length - 1];

  if (lastAction && lastAction.stop) {
    return state;
  }

  return {
    ...state,
    [id]: {
      ...timer,
      actions: [
        ...timer.actions,
        {
          stop: Date.now(),
        },
      ],
    },
  };
};

const timerLog = handleActions(
  {
    [start]: handleStart,
    [stop]: handleStop,
  },
  DEFAULT_STATE,
);

export default timerLog;
