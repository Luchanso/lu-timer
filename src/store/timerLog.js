import { handleActions } from 'redux-actions';
import { stop, start, drop } from './timers';

const DEFAULT_STATE = [];

const handleStart = (state, action) => {
  const id = action.payload;

  return [...state, {
    id,
    start: Date.now(),
  }];
};

const handleStop = (state, action) => {
  const id = action.payload;

  return [...state, {
    id,
    stop: Date.now(),
  }];
};

const handleDrop = () => DEFAULT_STATE;

const timerLog = handleActions(
  {
    [start]: handleStart,
    [stop]: handleStop,
    [drop]: handleDrop,
  },
  DEFAULT_STATE,
);

export default timerLog;
