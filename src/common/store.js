import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { asyncMiddleware } from 'redux-amrc';
import rootReducer from './redux';


let createStoreWithMiddleware;

if (process.env.NODE_ENV === 'production') {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk, asyncMiddleware),
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk, asyncMiddleware),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);
}

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux', () => {
      const nextRootReducer = require('./redux').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
