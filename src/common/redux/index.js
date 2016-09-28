import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amr';
import counter from './counter';

const rootReducer = combineReducers({
  async: reducerCreator({ counter })
});

export default rootReducer;
