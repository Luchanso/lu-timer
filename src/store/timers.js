import { createAction, handleActions } from 'redux-actions';
import uuid4 from 'uuid4';

const DEFAULT_STATE = {};

export const create = createAction('timers/CREATE');
export const start = createAction('timers/START');
export const stop = createAction('timers/STOP');
export const changeTitle = createAction('timers/CHANGE_TITLE');
export const remove = createAction('timers/REMOVE');

// selectors

export const getStartedTimer = state => Object.values(state).find(item => item.started);

// handlers

const handleCreate = (state, action) => {
  const id = uuid4();
  return {
    ...state,
    id: {
      id,
      title: action.payload,
      started: false,
      startTime: 0,
      seconds: 0,
    },
  };
};

const handleStop = (state, action) => {
  const timer = state[action.payload];

  if (!timer.started) {
    return state;
  }

  return {
    ...state,
    [timer.id]: {
      ...timer,
      started: false,
      seconds: timer.seconds + (Date.now() - timer.startTime) / 1000,
    },
  };
};

const handleStart = (state, action) => {
  const timer = state[action.payload];

  if (timer.started) {
    return state;
  }

  const startedTimer = getStartedTimer(state);

  return handleStop({
    ...state,
    [timer.id]: {
      ...timer,
      started: true,
      startTime: Date.now(),
    },
  }, stop(startedTimer.id));
};

const handleChangeTitle = (state, action) => {
  const { id, title } = action.payload;
  const timer = state[id];

  return {
    ...state,
    [timer.id]: {
      ...timer,
      title,
    },
  };
};

const handleRemove = (state, action) => {
  const newState = { ...state };
  delete newState[action.payload.id];
  return newState;
};

export const timers = handleActions(
  {
    create: handleCreate,
    start: handleStart,
    stop: handleStop,
    changeTitle: handleChangeTitle,
    remove: handleRemove,
  },
  DEFAULT_STATE,
);
