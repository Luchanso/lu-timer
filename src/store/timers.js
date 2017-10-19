import { createAction, handleActions } from 'redux-actions';
import uuid4 from 'uuid4';

const DEFAULT_STATE = {};

// selectors

export const getStartedTimer = state => Object.values(state).find(item => item.started);

// actions

export const create = createAction('timers/CREATE');
export const start = createAction('timers/START');
export const stop = createAction('timers/STOP');
export const toggleNextTimer = id => (dispatch, getState) => {
  const state = getState();
  const { timers } = state;

  const timerTarget = timers[id];
  const timerActive = getStartedTimer(timers);

  if (!timerTarget) return;

  if (timerActive) {
    dispatch(stop(timerActive.id));
  }

  dispatch(start(timerTarget.id));
};
export const changeTitle = createAction('timers/CHANGE_TITLE');
export const remove = createAction('timers/REMOVE');

// handlers

const handleCreate = (state, action) => {
  const id = uuid4();
  return {
    ...state,
    [id]: {
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

  return {
    ...state,
    [timer.id]: {
      ...timer,
      started: true,
      startTime: Date.now(),
    },
  };
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
  delete newState[action.payload];
  return newState;
};

const timers = handleActions(
  {
    [create]: handleCreate,
    [start]: handleStart,
    [stop]: handleStop,
    [changeTitle]: handleChangeTitle,
    [remove]: handleRemove,
  },
  DEFAULT_STATE,
);

export default timers;
