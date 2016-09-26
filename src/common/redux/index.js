import { combineReducers, compose } from 'redux';
import { reducer as asyncReducer } from 'redux-amr';
import counter from '../redux/counter';

const rootReducer = combineReducers({
  async: compose(counter)(asyncReducer)
});

export default rootReducer;
