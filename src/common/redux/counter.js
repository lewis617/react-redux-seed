import { ASYNC } from 'redux-amr';
import customFetch from './utils/customFetch';

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

export default reducer => (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: counter(state.counter, action)
      };
    default:
      return reducer(state, action);
  }
};
