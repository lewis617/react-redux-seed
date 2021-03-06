import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import match from 'react-router/lib/match';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import { getRoutes, configureStore } from '../common';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('app');
const history = browserHistory;
const routes = getRoutes(store);

match({ history, routes }, (err, redirect, renderProps) => {
  if (redirect) {
    history.replace(redirect);
  } else if (err) {
    history.goBack();
    console.error(err.stack);
  } else {
    render(
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>,
      rootElement
    );
  }
});
