import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Main, Home, Counter, NotFound } from './containers';
import { loadCounter } from './redux/counter';

const preload = promise => (nextState, replace, cb) => {
  if (__SERVER__ || nextState.location.action === 'PUSH') {
    promise().then(() => cb());
  } else {
    cb();
  }
};

export default (store) => {
  const counterPromise = () => store.dispatch(loadCounter());
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="counter" component={Counter} onEnter={preload(counterPromise)}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
