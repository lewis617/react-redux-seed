import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { async } = getState();

    if (async.counter.value % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay = 1000) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export function loadCounter() {
  return {
    [ASYNC]: {
      key: 'counter',
      promise: () => customFetch('/counter')
    }
  };
}

export function loadCounterIfNeeded() {
  return (dispatch, getState) => {
    const loadState = getState().async.loadState;
    if (loadState.counter && loadState.counter.loaded) {
      return Promise.resolve();
    }
    return dispatch(loadCounter());
  };
}

const initialState = {
  value: 0
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        value: state.value + 1
      };
    case DECREMENT_COUNTER:
      return {
        value: state.value - 1
      };
    default:
      return state;
  }
}

export default counter;
